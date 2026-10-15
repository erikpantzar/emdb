---
name: pr-screenshot
description: Capture before/after screenshots of the emdb app with Playwright and post them side by side on a GitHub PR. Use when a PR needs visual proof of a UI change — "attach screenshots to the PR", "before/after images", "show the movie page on the PR".
---

# PR screenshot: before vs after

`scripts/pr-shots.mjs` shoots the same routes twice: "before" from the PR's
base branch, "after" from the current checkout. With `--pr` it uploads the
images and posts one comment with a Route | Before | After table.

## Run it

From the checkout that has the change (needs `.env` with `VITE_TMDB_KEY`):

```bash
npm run pr-shots -- --route / --route /movie/550 --pr <N>
```

- No `--route` means `/`. Routes are app routes without `/emdb` (see `src/App.jsx`).
- `--pr <N>` reads the base branch from the PR; `--base <branch>` overrides, default `master`.
- Leave out `--pr` to only capture locally into `.pr-shots/` (gitignored).

What it does: fetches origin, resets a detached worktree of `origin/<base>` at
`~/dev/emdb-worktrees/pr-shots-base` (copies `.env`, runs `npm ci` only when
the lockfile changed), starts Vite on :5174 (base) and :5175 (current) with
`--strictPort`, shoots each route at 1280x800 full page after networkidle, and
always stops both servers. Erik's own dev server on :5173 is left alone.

## Non-default state

Only routes for now. Pick a URL that lands in the state you want (browse
filters and search live in the query string, e.g. `/browse?genre=18`). For
clicks, dialogs or hover states, extend the script with a per-route step.

## Upload

Images go to the orphan `pr-assets` branch under `pr-<N>/`, through the
Contents API, never into the PR branch. The script creates the branch with an
empty-tree commit if it is missing. The repo is public, so embeds use
`https://raw.githubusercontent.com/erikpantzar/emdb/<commit-sha>/pr-<N>/<file>.jpg`,
pinned to the upload commit. Re-running for the same PR overwrites the files
and posts a new comment.

## Check it renders

```bash
gh api repos/erikpantzar/emdb/issues/comments/<comment-id> \
  -H "Accept: application/vnd.github.html+json" --jq .body_html
curl -sI <raw-url> | grep -iE '^(HTTP|content-type)'
```

Good: the `<img>` src stays the raw.githubusercontent.com URL (verified on
PR #40) and the raw URL returns `200` and `image/jpeg`.

## Dead ends (from teneo-x, don't retry)

- Release assets: need API auth headers to download, don't render inline.
- Gists: `gh gist create` rejects binary files.
- Committing images to the PR branch: renders, but merges the screenshots into
  `master` forever. Use `pr-assets`.
