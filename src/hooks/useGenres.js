import { useEffect, useState } from 'react'
import api from '../api'

let cache
let request

const loadGenres = () => {
  request ??= api
    .genres()
    .then((res) => {
      cache = res.genres
      return cache
    })
    .catch(() => {
      request = undefined
      return []
    })
  return request
}

export default function useGenres() {
  const [genres, setGenres] = useState(cache || [])

  useEffect(() => {
    if (cache) return
    let active = true
    loadGenres().then((list) => active && setGenres(list))
    return () => {
      active = false
    }
  }, [])

  return genres
}

const useGenreNames = () => {
  const genres = useGenres()
  return new Map(genres.map((genre) => [genre.id, genre.name]))
}

export { useGenreNames }
