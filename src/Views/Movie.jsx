import React from 'react'
import { useParams } from 'react-router-dom'
import MovieContainer from '../components/Movie/MovieContainer'

const Movie = () => {
  const { id } = useParams()

  return (
    <div>
      <MovieContainer id={id} />
    </div>
  )
}

export default Movie
