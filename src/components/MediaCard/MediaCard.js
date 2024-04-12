import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../Trending/Trending.css'
import { GenreContext } from '../Genres/genresContext'

// general helper
// put in util ?
const matchGenre = (id, genres) => {
  for (let genre of genres) {
    if (id === genre.id) {
      return genre.name
    }
  }

  return null
}

export const TrendingCard = ({ item, mediaType }) => {
  const genres = useContext(GenreContext).genres

  return (
    <article className={`card card-${mediaType}`} key={item.id}>
      <div className="card-media-type">{mediaType.toUpperCase()}</div>
      <header className="card-header">
        <div>
          {item.vote_average} ({item.vote_count})
        </div>
        {mediaType === 'tv' ? (
          <Link to={`/tv/${item.id}`}>
            <h2 className="card-title">{item.name}</h2>
          </Link>
        ) : (
          <Link to={`/movie/${item.id}`}>
            <h2 className="card-title">{item.title}</h2>
          </Link>
        )}

        {item.release_date && (
          <span className="card-release-date">
            Released: {item.release_date}
          </span>
        )}

        <div className="card-body-container">
          <p className="card-body">{item.overview}</p>
        </div>

        <div className="genres">
          {item.genre_ids.map((genreId) => (
            <div className="card-tag genre" key={genreId}>
              {matchGenre(genreId, genres)}
            </div>
          ))}
        </div>
      </header>

      <img
        className="card-poster"
        src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
        alt="placeholder text"
      />
    </article>
  )
}
