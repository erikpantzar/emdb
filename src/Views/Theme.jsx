import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api'
import InfiniteMovies from '../components/InfiniteMovies/InfiniteMovies'

const Theme = () => {
  const { id } = useParams()
  const [name, setName] = useState('')

  useEffect(() => {
    let active = true
    setName('')

    api
      .keyword(id)
      .then((res) => active && setName(res.name))
      .catch(() => active && setName(`Theme ${id}`))

    return () => {
      active = false
    }
  }, [id])

  return (
    <section>
      <p>
        <Link to="/themes">All themes</Link>
      </p>
      <h1>{name || '...'}</h1>

      <InfiniteMovies
        key={id}
        fetchPage={(page) => api.moviesWithKeyword(id, page)}
      />
    </section>
  )
}

export default Theme
