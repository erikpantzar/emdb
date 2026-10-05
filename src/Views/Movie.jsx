import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api'
import useAsync from '../hooks/useAsync'
import { useVisit } from '../components/Trail/useTrail'
import { MovieRow, Row } from '../components/Row/Row'
import { PersonCard } from '../components/PersonCard/PersonCard'
import { SeenToggle } from '../components/Seen/Seen'
import { PlayIcon } from '../components/Icons/Icons'
import Trailers from '../components/Trailers/Trailers'
import { image, ratingOf, runtimeOf, yearOf } from '../lib/format'
import './Movie.css'

const keyJobs = [
  ['Director', ['Director']],
  ['Writer', ['Screenplay', 'Writer', 'Story']],
  ['Composer', ['Original Music Composer', 'Music']],
  ['Cinematography', ['Director of Photography']],
]

const crewByRole = (crew) =>
  keyJobs
    .map(([role, jobs]) => [
      role,
      [
        ...new Map(
          crew
            .filter((person) => jobs.includes(person.job))
            .map((person) => [person.id, person])
        ).values(),
      ],
    ])
    .filter(([, people]) => people.length > 0)

const MoreFromDirector = ({ director, movieId }) => {
  const { data } = useAsync(
    () => api.personCredits(director.id),
    [director.id]
  )
  const movies = [
    ...new Map(
      (data?.crew || [])
        .filter((credit) => credit.job === 'Director' && credit.id !== movieId)
        .sort((a, b) => b.popularity - a.popularity)
        .map((credit) => [credit.id, credit])
    ).values(),
  ]

  if (!movies.length) return null

  return (
    <MovieRow
      title={`More from ${director.name}`}
      eyebrow="Director"
      seeAll={`/person/${director.id}`}
      movies={movies}
    />
  )
}

const Hero = ({ movie }) => {
  const rating = ratingOf(movie)

  return (
    <section className="Hero" aria-labelledby="movie-title">
      {movie.backdrop_path && (
        <img
          className="Hero-backdrop"
          src={image(movie.backdrop_path, 'w1280')}
          alt=""
          width="1280"
          height="720"
        />
      )}
      <div className="Hero-inner">
        <div className="Hero-poster">
          {movie.poster_path ? (
            <img
              src={image(movie.poster_path, 'w500')}
              alt={`Poster for ${movie.title}`}
              width="500"
              height="750"
            />
          ) : (
            <span className="Card-fallback" aria-hidden="true">
              {movie.title}
            </span>
          )}
        </div>

        <div className="Hero-body">
          <h1 id="movie-title" className="Hero-title">
            {movie.title}
          </h1>

          <ul className="Hero-facts">
            {movie.release_date && <li>{yearOf(movie.release_date)}</li>}
            {movie.runtime > 0 && <li>{runtimeOf(movie.runtime)}</li>}
            {rating && (
              <li className="Hero-rating">
                <span aria-hidden="true">★</span> {rating}
                <span className="visually-hidden"> out of 10</span>
                <span className="Hero-votes">
                  {movie.vote_count.toLocaleString()} votes
                </span>
              </li>
            )}
          </ul>

          {movie.genres?.length > 0 && (
            <ul className="Chips Hero-genres" aria-label="Genres">
              {movie.genres.map((genre) => (
                <li key={genre.id}>
                  <Link to={`/browse?genre=${genre.id}`} className="Chip">
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {movie.tagline && <p className="Hero-tagline">{movie.tagline}</p>}
          <p className="Hero-overview">{movie.overview}</p>
        </div>
      </div>
    </section>
  )
}

const Movie = () => {
  const { id } = useParams()
  const [wantTrailer, setWantTrailer] = useState(false)
  const { data, error } = useAsync(() => {
    setWantTrailer(false)
    return api.movieDetails(id)
  }, [id])
  useVisit(String(data?.movie.id) === id && data.movie.title)

  if (error) {
    return <p className="Status">Could not load movie: {error}</p>
  }

  if (!data) {
    return (
      <p className="Status" role="status">
        Loading…
      </p>
    )
  }

  const { movie, credits, similar, recommendations, keywords } = data
  const crew = crewByRole(credits.crew)
  const director = credits.crew.find((person) => person.job === 'Director')
  const more = recommendations?.results.length
    ? recommendations.results
    : similar.results

  return (
    <article className="Page Movie">
      <Hero movie={movie} />

      <div className="Movie-actions">
        <SeenToggle movie={movie} className="Button" withLabel />
        <button
          type="button"
          className="Button"
          aria-expanded={wantTrailer}
          onClick={() => setWantTrailer(!wantTrailer)}
        >
          <PlayIcon />
          {wantTrailer ? 'Hide trailers' : 'Show trailers'}
        </button>
      </div>

      {wantTrailer && <Trailers movieId={movie.id} />}

      {crew.length > 0 && (
        <section className="Movie-section" aria-labelledby="crew-title">
          <h2 id="crew-title" className="visually-hidden">
            Key crew
          </h2>
          <dl className="Crew">
            {crew.map(([role, people]) => (
              <div key={role} className="Crew-item">
                <dt>{role}</dt>
                {people.map((person) => (
                  <dd key={person.id}>
                    <Link to={`/person/${person.id}`}>{person.name}</Link>
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </section>
      )}

      {credits.cast.length > 0 && (
        <Row title="Cast" eyebrow="Starring">
          {credits.cast.slice(0, 20).map((person) => (
            <PersonCard
              key={person.credit_id}
              person={person}
              note={person.character}
            />
          ))}
        </Row>
      )}

      {keywords.length > 0 && (
        <section className="Movie-section" aria-labelledby="themes-title">
          <h2 id="themes-title" className="Movie-subtitle">
            Themes
          </h2>
          <ul className="Chips">
            {keywords.map((theme) => (
              <li key={theme.id}>
                <Link to={`/theme/${theme.id}`} className="Chip">
                  {theme.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {more.length > 0 && (
        <MovieRow title="More like this" eyebrow="Explore" movies={more} />
      )}

      {director && <MoreFromDirector director={director} movieId={movie.id} />}
    </article>
  )
}

export default Movie
