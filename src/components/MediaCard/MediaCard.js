import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { GenreContext } from '../Genres/genresContext'
import './MediaCard.css'
import Ratings from '../Ratings/Ratings'

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
      <Link to={`/m/${mediaType}/${item.id}`} className="card-link">
        <div className="card-media-type">{mediaType.toUpperCase()}</div>
        <img
          className="card-poster"
          src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
          alt="placeholder text"
        />
        <header className="card-header">
          <Ratings average={item.vote_average} count={item.vote_count} />

          {mediaType === 'tv' ? (
            <h2 className="card-title">{item.name}</h2>
          ) : (
            <h2 className="card-title">{item.title}</h2>
          )}

          {item.release_date && (
            <span className="card-release-date">{item.release_date}</span>
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
      </Link>
    </article>
  )
}

export default TrendingCard
