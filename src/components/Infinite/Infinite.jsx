import React from 'react'
import useInfinitePages from '../../hooks/useInfinitePages'
import { MovieGrid } from '../Card/MovieCard'

const InfiniteList = ({ fetchPage, children }) => {
  const { items, isLoading, error, hasMore, sentinelRef } =
    useInfinitePages(fetchPage)

  return (
    <div aria-busy={isLoading}>
      {children(items)}
      <div role="status" className="Status">
        {isLoading && 'Loading more…'}
        {error && `Could not load: ${error}`}
        {!isLoading && !hasMore && items.length === 0 && 'Nothing found.'}
      </div>
      <div ref={sentinelRef} />
    </div>
  )
}

const InfiniteMovies = ({ fetchPage }) => (
  <InfiniteList fetchPage={fetchPage}>
    {(movies) => <MovieGrid movies={movies} />}
  </InfiniteList>
)

export { InfiniteList, InfiniteMovies }
