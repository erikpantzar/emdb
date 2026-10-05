import { useEffect, useSyncExternalStore } from 'react'
import { useLocation } from 'react-router-dom'

const STORAGE_KEY = 'emdb-trail'
const MAX_STEPS = 8
const listeners = new Set()

const load = () => {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

const save = (steps) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(steps))
  } catch {
    return
  }
}

let trail = load()

const visit = (path, label) => {
  const index = trail.findIndex((step) => step.path === path)
  trail =
    index === -1
      ? [...trail, { path, label }].slice(-MAX_STEPS)
      : trail.slice(0, index + 1)
  save(trail)
  listeners.forEach((listener) => listener())
}

const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const useTrail = () => useSyncExternalStore(subscribe, () => trail)

const useVisit = (label) => {
  const { pathname } = useLocation()

  useEffect(() => {
    if (label) visit(pathname, label)
  }, [pathname, label])
}

export { useTrail, useVisit }
