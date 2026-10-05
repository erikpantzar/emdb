import React from 'react'
import api from '../../api'
import useAsync from '../../hooks/useAsync'

const Trailers = ({ movieId }) => {
  const { data, error } = useAsync(() => api.videos(movieId), [movieId])

  if (error) {
    return <p className="Status">Could not load trailers: {error}</p>
  }

  if (!data) {
    return (
      <p className="Status" role="status">
        Loading trailers…
      </p>
    )
  }

  const trailers = data.results.filter((video) => video.site === 'YouTube')

  if (!trailers.length) {
    return <p className="Status">No trailers found.</p>
  }

  return (
    <ul className="Trailers">
      {trailers.map((trailer) => (
        <li key={trailer.id}>
          <iframe
            title={trailer.name || `Trailer ${trailer.key}`}
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0`}
            allowFullScreen
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  )
}

export default Trailers
