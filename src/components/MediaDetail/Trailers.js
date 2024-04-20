import React from 'react'

const Trailers = ({ trailers }) => {
  if (!trailers) {
    return null
  }

  return (
    <div className="trailers">
      {trailers &&
        trailers
          .filter((v) => v.site === 'YouTube')
          .filter((v) => v.type === 'Trailer')
          .splice(0, 1)
          .map((video, idx) => (
            <iframe
              title={idx}
              key={idx}
              type="text/html"
              width="640"
              height="360"
              src={`https://www.youtube.com/embed/${video.key}?autoplay=0`}
            ></iframe>
          ))}
    </div>
  )
}

export default Trailers
