import React, { useState } from "react"
import api from "../../api"
import { Link } from "react-router-dom"
import { Thumbnail } from "../Poster/Poster"
import Genres from "../Genre/Genre"

import "./Search.css"

const Search = ({ toggleSearch }) => {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])
  const [actors, setActors] = useState([])

  const doSearch = async () => {
    setIsLoading(true)

    const res = await api.search(query)
    const actors = await api.searchActor(query)

    setIsLoading(false)
    setResults(res.results)
    setActors(actors.results)
  }

  return (
    <div className="search-container animateIn">
      <button
        className="search-close-button button"
        onClick={() => toggleSearch()}
      >
        X
      </button>
      <form
        className="search-form"
        onSubmit={(event) => {
          event.preventDefault()
          doSearch()
        }}
      >
        <input
          placeholder="Search"
          defaultValue={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {isLoading && <div className="search-loading">Is searching {query}</div>}

      <section className="search-results-container">
        

        {results && (
          <ul className="search-results-movies">
            {results.map((result, index) => (
              <SearchResultItem key={index} result={result} />
            ))}
          </ul>
        )}

        {actors && (
          <ul className="search-results-actors">
            {actors.map((result, index) => (
              <SearchResultItem key={index} result={result} />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default Search


const SearchResultItem = ({ result }) => {
  if (result.hasOwnProperty("gender")) {
    return <ActorListItem actor={result} />
  } else {
    return <MovieListItem movie={result} />
  }
}

const MovieListItem = ({ movie }) => {
  return (
    <div>
      <Link to={`/movie/${movie.id}`}>
        <Thumbnail poster={movie.poster_path} />
        <h3>{movie.title}</h3>
      </Link>
      <p>Release: {movie.release_date}</p>
    </div>
  )
}

const ActorListItem = ({ actor }) => {
  // actor.id
  return (
    <div>
      <Thumbnail poster={actor.profile_path} />
      <h3>{actor.name}</h3>

      <h4>Known for:</h4>
      <ul>
        {actor.known_for.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              {movie.vote_average} {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
