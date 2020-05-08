import React from "react"
import Poster from "../Poster/Poster"

const MoviePresentation = ({ movie }) => {
  return (
    <article>
      <header>
        <h1>
          {movie.title} -{" "}
          <span>
            {movie.vote_average} (votes: {movie.vote_count})
          </span>
        </h1>
        <span>{movie.release_date}</span>

        <p>Runtime: {movie.runtime}</p>

        <p>{movie.tagline}</p>
      </header>

      <p>{movie.overview}</p>

      <Poster poster={movie.poster_path} />
    </article>
  )
}

export default MoviePresentation
