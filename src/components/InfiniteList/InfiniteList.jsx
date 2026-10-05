import React from 'react'
import useInfinitePages from '../../hooks/useInfinitePages'

const InfiniteList = ({ fetchPage, children }) => {
  const { items, isLoading, error, hasMore, sentinelRef } =
    useInfinitePages(fetchPage)

  return (
    <div>
      {children(items)}
      {isLoading && <p>Loading...</p>}
      {error && <p>Could not load: {error}</p>}
      {!hasMore && items.length === 0 && <p>Nothing found.</p>}
      <div ref={sentinelRef} />
    </div>
  )
}

export default InfiniteList
