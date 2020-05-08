import React, { useState, useEffect } from "react"
import api from "../../api"

import MoviePresentation from "./MoviePresentation"
import Trailers from "../Trailers/Trailers"
import MovieList from "../MovieList/MovieList"

const MovieContainer = ({ id }) => {
  const [movie, setMovie] = useState({})
  const [credits, setCredits] = useState({})
  const [similar, setSimilar] = useState({})
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const res = await api.movieDetails(id)

      setLoading(false)

      setMovie(res.movie)
      setSimilar(res.similar.results)
      setCredits(res.credits)
    }

    fetch()

    return () => {
      return false
    }
  }, [id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <section>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <MoviePresentation movie={movie} credits={credits} />
          {similar.length && <MovieList movies={similar} />}
        </div>
        {movie.title && <Trailers movie={movie.title} />}
      </div>
    </section>
  )
}

export default MovieContainer
