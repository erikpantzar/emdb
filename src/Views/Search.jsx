import React from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api'
import useAsync from '../hooks/useAsync'
import { MovieGrid } from '../components/Card/MovieCard'
import { Row } from '../components/Row/Row'
import { PersonCard } from '../components/PersonCard/PersonCard'
import { HideSeenSwitch } from '../components/Seen/Seen'

const Search = () => {
  const [params] = useSearchParams()
  const query = params.get('q') || ''
  const { data, error } = useAsync(
    () =>
      query
        ? Promise.all([api.search(query), api.searchPerson(query)])
        : Promise.resolve([{ results: [] }, { results: [] }]),
    [query]
  )
  const [movies, people] = data || []

  return (
    <section className="Page">
      <div className="Page-head">
        <div>
          <span className="Eyebrow">Search</span>
          <h1>{query ? `“${query}”` : 'Search'}</h1>
        </div>
        <HideSeenSwitch />
      </div>

      {error && <p className="Status">Search failed: {error}</p>}
      {!data && !error && (
        <p className="Status" role="status">
          Searching…
        </p>
      )}

      {people?.results.length > 0 && (
        <Row title="People" eyebrow="Matches">
          {people.results.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              note={person.known_for_department}
            />
          ))}
        </Row>
      )}

      {movies && (
        <section aria-labelledby="search-movies">
          <h2 id="search-movies" className="Movie-subtitle">
            Movies
          </h2>
          {movies.results.length ? (
            <MovieGrid movies={movies.results} />
          ) : (
            <p className="Status">No movies found.</p>
          )}
        </section>
      )}
    </section>
  )
}

export default Search
