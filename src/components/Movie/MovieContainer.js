import React, { useState, useEffect } from 'react'
import api from '../../api'

import MoviePresentation from './MoviePresentation'
import Trailers from '../Trailers/Trailers'
import MovieList from '../MovieList/MovieList'
import Credits from '../Credits/Credits'

const MovieContainer = ({ id }) => {
  const [movie, setMovie] = useState({})
  const [credits, setCredits] = useState({})
  const [similar, setSimilar] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [wantTrailer, setWantTrailer] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const res = await api.movieDetails(id)

      setMovie(res.movie)
      setSimilar(res.similar.results)
      setCredits(res.credits)
      setLoading(false)
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
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <MoviePresentation movie={movie} credits={credits} />

          {credits && <Credits credits={credits} />}

          {similar.length && (
            <div>
              <h2>Similiar movies</h2>
              <MovieList movies={similar} />
            </div>
          )}
        </div>
        {movie.title && wantTrailer && <Trailers movie={movie.title} />}
      </div>
    </section>
  )
}

export default MovieContainer
