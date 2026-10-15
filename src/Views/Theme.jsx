import React from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api'
import useAsync from '../hooks/useAsync'
import { useVisit } from '../components/Trail/useTrail'
import { InfiniteMovies } from '../components/Infinite/Infinite'

const Theme = () => {
  const { id } = useParams()
  const { data, error } = useAsync(() => api.keyword(id), [id])
  const name = data?.name || (error ? `Theme ${id}` : null)
  useVisit(name && `#${name}`)

  return (
    <section className="Page">
      <div className="Page-head">
        <div>
          <Link to="/themes" className="Eyebrow">
            Theme
          </Link>
          <h1>{name || '…'}</h1>
        </div>
      </div>

      <InfiniteMovies
        key={id}
        fetchPage={(page) => api.moviesWithKeyword(id, page)}
      />
    </section>
  )
}

export default Theme
