import React, { useState, useEffect } from 'react'

import api from '../../api'
import MovieList from '../MovieList/MovieList'

const Trending = () => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState()

  useEffect(() => {
    async function fetch() {
      if (page > maxPage) {
        return false
      }

      try {
        const res = await api.trending({ page: page })
        setMovies([...movies, ...res.results])
        setMaxPage(res.total_pages)
      } catch (error) {
        console.error(error)
      }
    }

    fetch()
  }, [page])

  const handleScroll = (event) => {
    const element = document.querySelector('#one')
    const win = window.innerHeight
    const bottom = element.getBoundingClientRect().bottom

    if (bottom <= win) {
      if (page < maxPage + 1) {
        setPage(page + 1)
      }
    }
  }

  useEffect(() => {
    function list() {
      document.addEventListener('scroll', handleScroll)
    }

    list()

    return function cleanup() {
      document.removeEventListener('scroll', handleScroll)
    }
  })

  const isMore = page < maxPage

  return (
    <section id="one">
      <h1>Trending</h1>

      <MovieList movies={movies} />

      {isMore && (
        <button
          type="button"
          onClick={() => {
            setPage(page + 1)
          }}
        >
          Get more
        </button>
      )}
    </section>
  )
}

export default Trending
