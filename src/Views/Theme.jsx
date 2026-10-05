import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api'
import InfiniteMovies from '../components/InfiniteMovies/InfiniteMovies'
import { useVisit } from '../components/Trail/useTrail'

const Theme = () => {
  const { id } = useParams()
  const [theme, setTheme] = useState({})
  useVisit(theme.id === id && `#${theme.name}`)

  useEffect(() => {
    let active = true
    setTheme({})

    api
      .keyword(id)
      .then((res) => active && setTheme({ id, name: res.name }))
      .catch(() => active && setTheme({ id, name: `Theme ${id}` }))

    return () => {
      active = false
    }
  }, [id])

  return (
    <section>
      <p>
        <Link to="/themes">All themes</Link>
      </p>
      <h1>{theme.id === id ? theme.name : '...'}</h1>

      <InfiniteMovies
        key={id}
        fetchPage={(page) => api.moviesWithKeyword(id, page)}
      />
    </section>
  )
}

export default Theme
