import React from "react"
import { Link } from "react-router-dom"
import { Thumbnail } from "../Poster/Poster"

import "./MovieList.css"

const MovieList = ({ movies = [] }) => {
  console.log(movies)
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movie/${movie.id}`} className="movie-item">
            <Thumbnail poster={movie.poster_path} />

            <h2>
              {movie.vote_average} ({movie.vote_count})
            </h2>
            <h3 className="movie-item-heading">{movie.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default MovieList
