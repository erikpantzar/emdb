import React from 'react'
import { useWatchlist } from '../../hooks/useWatchlist'
import { BookmarkIcon } from '../Icons/Icons'

const entryOf = (movie) => ({
  type: 'movie',
  id: movie.id,
  title: movie.title,
  poster_path: movie.poster_path,
  date: movie.release_date,
  vote_average: movie.vote_average,
})

const WatchlistToggle = ({ movie, className, withLabel = false }) => {
  const { has, toggle } = useWatchlist()
  const isSaved = has('movie', movie.id)
  const label = isSaved
    ? `Remove ${movie.title} from watchlist`
    : `Add ${movie.title} to watchlist`

  return (
    <button
      type="button"
      className={className}
      aria-pressed={isSaved}
      aria-label={withLabel ? undefined : label}
      title={label}
      onClick={() => toggle(entryOf(movie))}
    >
      <BookmarkIcon filled={isSaved} />
      {withLabel && <span>Watchlist</span>}
    </button>
  )
}

export { WatchlistToggle }
