import React from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import useAsync from '../hooks/useAsync'
import { MovieRow } from '../components/Row/Row'
import { HideSeenSwitch } from '../components/Seen/Seen'
import { Rating } from '../components/Card/MovieCard'
import { image, yearOf } from '../lib/format'
import './Home.css'

const genreRows = [
  [878, 'Science fiction'],
  [18, 'Drama'],
  [53, 'Thriller'],
  [35, 'Comedy'],
  [28, 'Action'],
  [27, 'Horror'],
  [16, 'Animation'],
  [99, 'Documentary'],
]

const FetchRow = ({ load, ...props }) => {
  const { data, error } = useAsync(load, [])
  const status = error
    ? `Could not load: ${error}`
    : !data
      ? 'Loading…'
      : null

  return <MovieRow movies={data?.results} status={status} {...props} />
}

const Spotlight = ({ movie }) => (
  <section className="Spotlight" aria-labelledby="spotlight-title">
    {movie.backdrop_path && (
      <img
        className="Spotlight-image"
        src={image(movie.backdrop_path, 'w1280')}
        alt=""
        width="1280"
        height="720"
      />
    )}
    <div className="Spotlight-body">
      <span className="Eyebrow">Number one this week</span>
      <h1 id="spotlight-title" className="Spotlight-title">
        {movie.title}
      </h1>
      <p className="Spotlight-meta">
        {yearOf(movie.release_date)} <Rating movie={movie} />
      </p>
      <p className="Spotlight-overview">{movie.overview}</p>
      <Link to={`/movie/${movie.id}`} className="Button Button--primary">
        Open {movie.title}
      </Link>
    </div>
  </section>
)

const Home = () => {
  const trending = useAsync(() => api.trending({ page: 1 }), [])
  const top = trending.data?.results[0]

  return (
    <div className="Page Home">
      {top ? (
        <Spotlight movie={top} />
      ) : (
        <h1 className="visually-hidden">Explore movies</h1>
      )}

      <div className="Home-bar">
        <p className="Home-lede">
          Rows to wander through. Mark what you have seen, then hide it.
        </p>
        <HideSeenSwitch />
      </div>

      <FetchRow
        title="In cinemas"
        eyebrow="Now showing"
        seeAll="/now"
        load={() => api.nowPlaying(1)}
      />
      <FetchRow
        title="Upcoming"
        eyebrow="Coming soon"
        seeAll="/now?tab=upcoming"
        load={() => api.upcoming(1)}
      />
      <MovieRow
        title="Trending this week"
        eyebrow="Everyone is watching"
        seeAll="/browse?sort=trending"
        movies={trending.data?.results.slice(1)}
        status={trending.error || (!trending.data && 'Loading…')}
      />
      {genreRows.map(([id, name]) => (
        <FetchRow
          key={id}
          title={name}
          eyebrow="Genre"
          seeAll={`/browse?genre=${id}`}
          load={() => api.genreRow(id)}
        />
      ))}
    </div>
  )
}

export default Home
