import React, { useId, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useVisibleMovies } from '../../hooks/useSeen'
import { MovieCard } from '../Card/MovieCard'
import { ChevronIcon } from '../Icons/Icons'
import './Row.css'

const Row = ({ title, eyebrow, seeAll, children }) => {
  const scroller = useRef(null)
  const headingId = useId()

  const scroll = (direction) => {
    const node = scroller.current
    if (!node) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    node.scrollBy({
      left: direction * node.clientWidth * 0.85,
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  return (
    <section className="Row" aria-labelledby={headingId}>
      <div className="Row-head">
        <div>
          {eyebrow && (
            <span className="Eyebrow" aria-hidden="true">
              {eyebrow}
            </span>
          )}
          <h2 id={headingId} className="Row-title">
            {title}
          </h2>
        </div>
        <div className="Row-actions">
          {seeAll && (
            <Link to={seeAll} className="Row-all">
              See all<span className="visually-hidden"> {title}</span>
            </Link>
          )}
          <button
            type="button"
            className="Row-step"
            aria-label={`Scroll ${title} back`}
            onClick={() => scroll(-1)}
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            className="Row-step"
            aria-label={`Scroll ${title} forward`}
            onClick={() => scroll(1)}
          >
            <ChevronIcon />
          </button>
        </div>
      </div>
      <ul className="Row-track" ref={scroller}>
        {children}
      </ul>
    </section>
  )
}

const MovieRow = ({ movies = [], status, ...props }) => {
  const visible = useVisibleMovies(movies)

  return (
    <Row {...props}>
      {status && <li className="Row-status">{status}</li>}
      {visible.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Row>
  )
}

export { Row, MovieRow }
