import React from 'react'
import useInfinitePages from '../../hooks/useInfinitePages'
import MovieList from '../MovieList/MovieList'

const InfiniteMovies = ({ fetchPage }) => {
  const { items, isLoading, error, hasMore, sentinelRef } =
    useInfinitePages(fetchPage)

  return (
    <div>
      <MovieList movies={items} />
      {isLoading && <p>Loading...</p>}
      {error && <p>Could not load movies: {error}</p>}
      {!hasMore && items.length === 0 && <p>No movies found.</p>}
      <div ref={sentinelRef} />
    </div>
  )
}

export default InfiniteMovies
