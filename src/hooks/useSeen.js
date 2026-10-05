import { useSyncExternalStore } from 'react'

const SEEN_KEY = 'emdb-seen'
const HIDE_KEY = 'emdb-hide-seen'
const listeners = new Set()

const read = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return value ?? fallback
  } catch {
    return fallback
  }
}

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    return
  }
}

let state = {
  seen: new Set(read(SEEN_KEY, [])),
  hideSeen: Boolean(read(HIDE_KEY, false)),
}

const emit = (next) => {
  state = next
  listeners.forEach((listener) => listener())
}

const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const toggleSeen = (id) => {
  const seen = new Set(state.seen)
  seen.has(id) ? seen.delete(id) : seen.add(id)
  write(SEEN_KEY, [...seen])
  emit({ ...state, seen })
}

const toggleHideSeen = () => {
  write(HIDE_KEY, !state.hideSeen)
  emit({ ...state, hideSeen: !state.hideSeen })
}

const useSeen = () => {
  const snapshot = useSyncExternalStore(subscribe, () => state)
  return { ...snapshot, toggleSeen, toggleHideSeen }
}

const useVisibleMovies = (movies) => {
  const { seen, hideSeen } = useSeen()
  return hideSeen ? movies.filter((movie) => !seen.has(movie.id)) : movies
}

export { useSeen, useVisibleMovies }
