import React from 'react'
import { Link } from 'react-router-dom'
import './ActorPresentation.css'

const ActorPresentation = ({ actor }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <article style={{ display: 'block', maxWidth: '660px' }}>
        <h1>{actor.name}</h1>

        <figure style={{ display: 'inline', float: 'left' }}>
          <img
            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
            alt={actor.name}
          />
        </figure>

        <p>{actor.biography}</p>
      </article>

      <section style={{ display: 'block' }} className="Actor-movies">
        <h2>Movies</h2>
        <ol className="Actor-movies-list">
          {actor.cast
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 22)
            .map((movie) => (
              <li key={movie.id} className={'Actor-movies-item'}>
                <Link to={`/movie/${movie.id}`} className={'Actor-movies-link'}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div>
                    <h3>{movie.title}</h3>
                    {movie.popularity}
                  </div>
                </Link>
              </li>
            ))}
        </ol>
      </section>
    </div>
  )
}

export default ActorPresentation
