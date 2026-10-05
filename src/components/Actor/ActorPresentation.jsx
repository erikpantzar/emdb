import React from 'react'
import { Link } from 'react-router-dom'
import { Thumbnail } from '../Poster/Poster'
import './ActorPresentation.css'

const newestFirst = (a, b) =>
  (b.release_date || '').localeCompare(a.release_date || '')

const groupByJob = (crew) => {
  const groups = {}
  crew.forEach((credit) => {
    groups[credit.job] = [...(groups[credit.job] || []), credit]
  })
  return Object.entries(groups).sort((a, b) => b[1].length - a[1].length)
}

const CreditList = ({ credits }) => (
  <ol className="Actor-movies-list">
    {[...credits].sort(newestFirst).map((movie) => (
      <li key={movie.credit_id} className="Actor-movies-item">
        <Link to={`/movie/${movie.id}`} className="Actor-movies-link">
          <Thumbnail poster={movie.poster_path} />
          <div>
            <h3>{movie.title}</h3>
            {(movie.release_date || '').slice(0, 4)}
            {movie.character && <span> as {movie.character}</span>}
          </div>
        </Link>
      </li>
    ))}
  </ol>
)

const ActorPresentation = ({ actor }) => {
  const isActor = actor.known_for_department === 'Acting'

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <article style={{ display: 'block', maxWidth: '660px' }}>
        <h1>{actor.name}</h1>
        <p>{actor.known_for_department}</p>

        <figure style={{ display: 'inline', float: 'left' }}>
          <img
            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
            alt={actor.name}
          />
        </figure>

        <p>{actor.biography}</p>
      </article>

      {isActor ? (
        <section style={{ display: 'block' }} className="Actor-movies">
          <h2>Movies</h2>
          <CreditList credits={actor.cast} />
        </section>
      ) : (
        groupByJob(actor.crew).map(([job, credits]) => (
          <section
            key={job}
            style={{ display: 'block' }}
            className="Actor-movies"
          >
            <h2>{job}</h2>
            <CreditList credits={credits} />
          </section>
        ))
      )}
    </div>
  )
}

export default ActorPresentation
