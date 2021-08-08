import React, { useState, useEffect } from "react"

import api from "../../api"
import MovieList from "../MovieList/MovieList"

const Trending = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function fetch() {
      const res = await api.trending()
      setMovies(res.results)
    }

    fetch()
  }, [])

  return (
    <section>
      <h2>Trending</h2>

      <MovieList movies={movies} />

    </section>
  )
}

export default Trending
