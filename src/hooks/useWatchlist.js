import { useSyncExternalStore } from 'react'

const KEY = 'emdb-watchlist'
const listeners = new Set()

const read = () => {
  try {
    const value = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

const write = (value) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(value))
  } catch {
    return
  }
}

let items = read()

const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const has = (type, id) =>
  items.some((item) => item.type === type && item.id === id)

const toggle = (item) => {
  items = has(item.type, item.id)
    ? items.filter(
        (saved) => !(saved.type === item.type && saved.id === item.id)
      )
    : [item, ...items]
  write(items)
  listeners.forEach((listener) => listener())
}

const useWatchlist = () => {
  const snapshot = useSyncExternalStore(subscribe, () => items)
  return { items: snapshot, has, toggle }
}

export { useWatchlist }
