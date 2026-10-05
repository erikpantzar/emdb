import React, { useEffect, useState } from 'react'
import api from '../../api'
import './Trailers.css'

const Trailers = ({ movieId }) => {
  const [trailers, setTrailers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await api.videos(movieId)
        setTrailers(res.results.filter((video) => video.site === 'YouTube'))
      } catch (err) {
        setError(err.message)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [movieId])

  if (isLoading) {
    return <div>Loading trailers...</div>
  }

  if (error) {
    return <div>Could not load trailers: {error}</div>
  }

  if (!trailers.length) {
    return <div>No trailers found.</div>
  }

  return (
    <section>
      <h3>Trailers</h3>

      <ul className="trailer-list">
        {trailers.map((trailer) => (
          <li key={trailer.id} className="trailer-list-item">
            <TrailerPlayer videoId={trailer.key} title={trailer.name} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Trailers

const TrailerPlayer = ({ videoId, title }) => {
  return (
    <iframe
      title={title || `ytplayer-${videoId}`}
      width="640"
      height="360"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
      allowFullScreen
    ></iframe>
  )
}

export { TrailerPlayer }
