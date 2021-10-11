import React from "react"
import Poster from "../Poster/Poster"
import './MoviePresentation.css'

const MoviePresentation = ({ movie }) => {
  return (
    <article className="MoviePresentation">
      <header>
        <h1>
          {movie.title} -{" "}
          <span>
            {movie.vote_average} (votes: {movie.vote_count})
          </span>
        </h1>
        <span>{movie.release_date} Release</span>

        <p>Runtime: {movie.runtime} minutes</p>

        <p><em>{movie.tagline}</em></p>
      </header>

      <p>{movie.overview}</p>

      <Poster poster={movie.poster_path} />
    </article>
  )
}

export default MoviePresentation
