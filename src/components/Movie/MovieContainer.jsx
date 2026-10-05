import React, { useState, useEffect } from 'react'
import api from '../../api'

import MoviePresentation from './MoviePresentation'
import Trailers from '../Trailers/Trailers'
import MovieList from '../MovieList/MovieList'
import Credits from '../Credits/Credits'

const MovieContainer = ({ id }) => {
  const [details, setDetails] = useState()
  const [error, setError] = useState()
  const [wantTrailer, setWantTrailer] = useState(false)

  useEffect(() => {
    let active = true
    setDetails(undefined)
    setError(undefined)
    setWantTrailer(false)

    api
      .movieDetails(id)
      .then((res) => active && setDetails(res))
      .catch((err) => active && setError(err.message))

    return () => {
      active = false
    }
  }, [id])

  if (error) {
    return <div>Could not load movie: {error}</div>
  }

  if (!details) {
    return <div>Loading...</div>
  }

  const { movie, credits, similar } = details

  return (
    <section>
      <MoviePresentation movie={movie} />

      <button type="button" onClick={() => setWantTrailer(!wantTrailer)}>
        {wantTrailer ? 'Hide trailers' : 'Show trailers'}
      </button>
      {wantTrailer && <Trailers movieId={movie.id} />}

      {credits && <Credits credits={credits} />}

      {similar.results.length > 0 && (
        <div>
          <h2>Similar movies</h2>
          <MovieList movies={similar.results} />
        </div>
      )}
    </section>
  )
}

export default MovieContainer
