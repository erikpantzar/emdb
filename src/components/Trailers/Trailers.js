import React, { useEffect, useState } from "react"
import "./Trailers.css"

const YOUTUBE_API_KEY =
  "AIzaSyCwB6b4wIOFpOoEaIywqveePJRF8iWIkgQ" || process.env.YOUTUBE_API_KEY

const Trailer = ({ movie }) => {
  const [trailers, setTrailers] = useState([])
  const [isLoading, setTisLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      let query = `${movie} trailer`
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${YOUTUBE_API_KEY}`

      const res = await (await fetch(url)).json()

      setTrailers(res.items)
      setTisLoading(false)
    }

    fetchData()
  }, [movie])

  if (isLoading) {
    return <div>Loading trailers...</div>
  }

  if (!trailers) {
    return null
  }

  return (
    <section>
      <h3>Trailers</h3>

      {trailers && (
        <ul className="trailer-list">
          {trailers.map((trailer) => (
            <li key={trailer.etag} className="trailer-list-item">
              <TrailerPlayer videoId={trailer.id.videoId} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Trailer

const TrailerPlayer = ({ videoId }) => {
  return (
    <iframe
      id={`ytplayer-${videoId}`}
      title={`ytplayer-${videoId}`}
      type="text/html"
      width="640"
      height="360"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
      frameBorder="0"
    ></iframe>
  )
}

export { TrailerPlayer }
