import { execFileSync, spawn } from 'node:child_process'
import { createHash } from 'node:crypto'
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'
import { parseArgs } from 'node:util'
import { chromium } from 'playwright'

const BASE_PORT = 5174
const CURRENT_PORT = 5175
const VIEWPORT = { width: 1280, height: 800 }
const BASE_WORKTREE = join(homedir(), 'dev', 'emdb-worktrees', 'pr-shots-base')

const { values } = parseArgs({
  options: {
    route: { type: 'string', multiple: true, default: ['/'] },
    pr: { type: 'string' },
    base: { type: 'string' },
  },
})

const root = execFileSync('git', ['rev-parse', '--show-toplevel'], {
  encoding: 'utf8',
}).trim()
const outDir = join(root, '.pr-shots')

function run(cmd, args, options = {}) {
  return execFileSync(cmd, args, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'inherit'],
    ...options,
  }).trim()
}

function baseBranch() {
  if (values.base) return values.base
  if (values.pr) {
    return run('gh', [
      'pr',
      'view',
      values.pr,
      '--json',
      'baseRefName',
      '--jq',
      '.baseRefName',
    ])
  }
  return 'master'
}

function prepareBaseWorktree(base) {
  run('git', ['fetch', '--quiet', 'origin', base])
  const ref = `origin/${base}`
  if (existsSync(BASE_WORKTREE)) {
    run('git', ['checkout', '--quiet', '--force', '--detach', ref], {
      cwd: BASE_WORKTREE,
    })
    run('git', ['clean', '--quiet', '-fd'], { cwd: BASE_WORKTREE })
  } else {
    run('git', ['worktree', 'add', '--quiet', '--detach', BASE_WORKTREE, ref])
  }
  copyFileSync(join(root, '.env'), join(BASE_WORKTREE, '.env'))

  const lockHash = createHash('sha256')
    .update(readFileSync(join(BASE_WORKTREE, 'package-lock.json')))
    .digest('hex')
  const marker = join(BASE_WORKTREE, 'node_modules', '.pr-shots-lock')
  const installed = existsSync(marker) && readFileSync(marker, 'utf8')
  if (installed !== lockHash) {
    console.log('Installing base dependencies')
    execFileSync('npm', ['ci'], { cwd: BASE_WORKTREE, stdio: 'inherit' })
    writeFileSync(marker, lockHash)
  }
}

function startServer(cwd, port) {
  const child = spawn(
    process.execPath,
    [
      join(cwd, 'node_modules', 'vite', 'bin', 'vite.js'),
      '--port',
      String(port),
      '--strictPort',
    ],
    { cwd, stdio: ['ignore', 'ignore', 'inherit'] }
  )
  child.exited = new Promise((done) => child.on('exit', done))
  return child
}

async function stopServer(child) {
  if (child.exitCode !== null || child.signalCode !== null) return
  child.kill('SIGTERM')
  const timeout = setTimeout(() => child.kill('SIGKILL'), 5000)
  await child.exited
  clearTimeout(timeout)
}

async function waitForServer(child, port) {
  const url = `http://localhost:${port}/emdb/`
  const deadline = Date.now() + 60_000
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Dev server on port ${port} exited early`)
    }
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch {}
    await new Promise((done) => setTimeout(done, 500))
  }
  throw new Error(`Dev server on port ${port} did not respond in 60s`)
}

function slugFor(route) {
  return (
    route
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase() || 'home'
  )
}

async function shoot(routes) {
  mkdirSync(outDir, { recursive: true })
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage({ viewport: VIEWPORT })
    const shots = []
    for (const route of routes) {
      const slug = slugFor(route)
      const path = route.replace(/^\//, '')
      const shot = { route, slug }
      for (const [side, port] of [
        ['before', BASE_PORT],
        ['after', CURRENT_PORT],
      ]) {
        const file = join(outDir, `${slug}-${side}.jpg`)
        await page.goto(`http://localhost:${port}/emdb/${path}`, {
          waitUntil: 'networkidle',
        })
        await page.waitForSelector('.Curtain', { state: 'detached' })
        await page.screenshot({
          path: file,
          fullPage: true,
          type: 'jpeg',
          quality: 70,
        })
        shot[side] = file
        console.log(file)
      }
      shots.push(shot)
    }
    return shots
  } finally {
    await browser.close()
  }
}

function ensureAssetsBranch(repo) {
  try {
    run('gh', ['api', `repos/${repo}/branches/pr-assets`, '--silent'], {
      stdio: 'pipe',
    })
  } catch {
    const emptyTree = run('git', ['hash-object', '-t', 'tree', '/dev/null'])
    const commit = run('git', [
      'commit-tree',
      emptyTree,
      '-m',
      'init pr-assets: PR screenshot storage, never merged',
    ])
    run('git', ['push', '--quiet', 'origin', `${commit}:refs/heads/pr-assets`])
  }
}

function existingSha(repo, path) {
  try {
    return run(
      'gh',
      ['api', `repos/${repo}/contents/${path}?ref=pr-assets`, '--jq', '.sha'],
      { stdio: 'pipe' }
    )
  } catch {
    return undefined
  }
}

function upload(repo, pr, file, name) {
  const path = `pr-${pr}/${name}`
  const body = {
    message: `pr #${pr}: ${name}`,
    branch: 'pr-assets',
    content: readFileSync(file).toString('base64'),
    sha: existingSha(repo, path),
  }
  const commit = run(
    'gh',
    [
      'api',
      '-X',
      'PUT',
      `repos/${repo}/contents/${path}`,
      '--input',
      '-',
      '--jq',
      '.commit.sha',
    ],
    { input: JSON.stringify(body) }
  )
  return `https://raw.githubusercontent.com/${repo}/${commit}/${path}`
}

function postComment(pr, base, shots) {
  const repo = run('gh', [
    'repo',
    'view',
    '--json',
    'nameWithOwner',
    '--jq',
    '.nameWithOwner',
  ])
  ensureAssetsBranch(repo)
  const rows = shots.map(({ route, slug, before, after }) => {
    const beforeUrl = upload(repo, pr, before, `${slug}-before.jpg`)
    const afterUrl = upload(repo, pr, after, `${slug}-after.jpg`)
    return `| \`${route}\` | ![${slug} before](${beforeUrl}) | ![${slug} after](${afterUrl}) |`
  })
  const body = [
    '### Screenshots',
    '',
    `| Route | Before (\`${base}\`) | After |`,
    '| --- | --- | --- |',
    ...rows,
  ].join('\n')
  return run('gh', ['pr', 'comment', pr, '--body-file', '-'], { input: body })
}

const base = baseBranch()
prepareBaseWorktree(base)

const servers = [
  startServer(BASE_WORKTREE, BASE_PORT),
  startServer(root, CURRENT_PORT),
]
const stopAll = () => Promise.all(servers.map(stopServer))
process.on('SIGINT', () => stopAll().then(() => process.exit(130)))

let shots
try {
  await waitForServer(servers[0], BASE_PORT)
  await waitForServer(servers[1], CURRENT_PORT)
  shots = await shoot(values.route)
} finally {
  await stopAll()
}

if (values.pr) {
  console.log(postComment(values.pr, base, shots))
}
