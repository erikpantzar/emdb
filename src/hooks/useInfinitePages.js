import { useEffect, useRef, useState } from 'react'

const MAX_TMDB_PAGE = 500

const uniqueById = (list) => [
  ...new Map(list.map((item) => [item.id, item])).values(),
]

export default function useInfinitePages(fetchPage) {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const sentinelRef = useRef(null)

  useEffect(() => {
    let active = true
    setIsLoading(true)

    fetchPage(page)
      .then((res) => {
        if (!active) return
        setItems((prev) => uniqueById([...prev, ...res.results]))
        setHasMore(page < Math.min(res.total_pages, MAX_TMDB_PAGE))
      })
      .catch((err) => active && setError(err.message))
      .finally(() => active && setIsLoading(false))

    return () => {
      active = false
    }
  }, [page])

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || !hasMore || isLoading || error) return

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setPage((p) => p + 1),
      { rootMargin: '600px' }
    )
    observer.observe(node)

    return () => observer.disconnect()
  }, [hasMore, isLoading, error])

  return { items, isLoading, error, hasMore, sentinelRef }
}
