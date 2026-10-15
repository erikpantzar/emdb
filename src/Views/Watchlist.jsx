import React from 'react'
import { Link } from 'react-router-dom'
import { useWatchlist } from '../hooks/useWatchlist'
import { MovieGrid } from '../components/Card/MovieCard'

const Watchlist = () => {
  const { items } = useWatchlist()
  const movies = items
    .filter((item) => item.type === 'movie')
    .map(({ date, ...movie }) => ({ ...movie, release_date: date }))

  return (
    <section className="Page">
      <div className="Page-head">
        <div>
          <span className="Eyebrow">Saved for later</span>
          <h1>Watchlist</h1>
        </div>
      </div>

      {movies.length ? (
        <MovieGrid movies={movies} />
      ) : (
        <div className="Status">
          <p>
            Nothing saved here yet. Tap the bookmark on any poster to save it
            for later.
          </p>
          <Link to="/browse" className="Button">
            Browse movies
          </Link>
        </div>
      )}

      <p className="Muted">Your watchlist is saved in this browser only.</p>
    </section>
  )
}

export default Watchlist
