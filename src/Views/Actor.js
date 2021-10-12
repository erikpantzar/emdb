import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
    <div>
      <article>
        <h1>{actor.name}</h1>

        <figure style={{ display: 'inline', float: 'left' }}>
          <img
            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
            alt={actor.name}
          />
        </figure>

        <p>{actor.biography}</p>
      </article>

      <section>
        <h2>Movies</h2>
        <ul>
          {actor.cast
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 22)
            .map((movie) => (
              <li key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                {movie.popularity}
              </li>
            ))}
        </ul>
      </section>
    </div>
  )
}

export default Actor
