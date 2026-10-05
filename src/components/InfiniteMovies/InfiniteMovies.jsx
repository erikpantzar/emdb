import React from 'react'
import InfiniteList from '../InfiniteList/InfiniteList'
import MovieList from '../MovieList/MovieList'

const InfiniteMovies = ({ fetchPage }) => (
  <InfiniteList fetchPage={fetchPage}>
    {(movies) => <MovieList movies={movies} />}
  </InfiniteList>
)

export default InfiniteMovies
