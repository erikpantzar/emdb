import React from 'react'
import { Link } from 'react-router-dom'
import { useGenreNames } from '../../hooks/useGenres'
import { useSeen, useVisibleMovies } from '../../hooks/useSeen'
import { image, ratingOf, yearOf } from '../../lib/format'
import { SeenToggle } from '../Seen/Seen'
import './Card.css'

const Rating = ({ movie }) => {
  const rating = ratingOf(movie)
  if (!rating) return null

  return (
    <span className="Card-rating">
      <span aria-hidden="true">★</span> {rating}
      <span className="visually-hidden"> out of 10</span>
    </span>
  )
}

const MovieCard = ({ movie, note }) => {
  const genreNames = useGenreNames()
  const { seen } = useSeen()
  const poster = image(movie.poster_path)
  const genres = (movie.genre_ids || [])
    .map((id) => genreNames.get(id))
    .filter(Boolean)
    .slice(0, 2)
  const year = yearOf(movie.release_date)

  return (
    <li className={seen.has(movie.id) ? 'Card is-seen' : 'Card'}>
      <Link to={`/movie/${movie.id}`} className="Card-link">
        <span className="Card-poster">
          {poster ? (
            <img
              src={poster}
              alt=""
              width="342"
              height="513"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="Card-fallback" aria-hidden="true">
              {movie.title}
            </span>
          )}
          <Rating movie={movie} />
        </span>
        <span className="Card-title">{movie.title}</span>
        <span className="Card-meta">
          {[year, note].filter(Boolean).join(' · ')}
        </span>
        {genres.length > 0 && (
          <span className="Card-genres">
            {genres.map((name) => (
              <span key={name} className="Card-genre">
                {name}
              </span>
            ))}
          </span>
        )}
      </Link>
      <SeenToggle movie={movie} className="Card-seen" />
    </li>
  )
}

const MovieGrid = ({ movies, notes = {} }) => {
  const visible = useVisibleMovies(movies)

  return (
    <ul className="Grid">
      {visible.map((movie) => (
        <MovieCard key={movie.id} movie={movie} note={notes[movie.id]} />
      ))}
    </ul>
  )
}

export { MovieCard, MovieGrid, Rating }
