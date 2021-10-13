import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api'

const Actor = () => {
  const { personId } = useParams()
  const [isLoading, setLoading] = useState(true)
  const [actor, setActor] = useState()

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const res = await api.fetchPerson(personId)
      setActor(res)
      setLoading(false)
    }

    fetch()

    return () => {
      return false
    }
  }, [personId])

  if (isLoading) {
    return <div>Loading...</div>
  }

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

      <section style={{ display: 'block' }}>
        <h2>Movies</h2>
        <ol
          style={{
            listStyle: 'none',
            padding: '0',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {actor.cast
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 22)
            .map((movie) => (
              <li key={movie.id} style={{ width: '25vw', margin: '0 0 2rem' }}>
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                  {movie.popularity}
                </Link>
              </li>
            ))}
        </ol>
      </section>
    </div>
  )
}

export default Actor
