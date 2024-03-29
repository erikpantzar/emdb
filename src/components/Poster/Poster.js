import React from 'react'
import './Poster.css'

const thumbUrl = (id) => `https://image.tmdb.org/t/p/w300/${id}`
const imageUrl = (id) => `https://image.tmdb.org/t/p/w500/${id}`
const fullImageUrl = (id) => `https://image.tmdb.org/t/p/original/${id}`

const Poster = ({ poster }) => {
  return (
    <figure className="Poster-figure">
      <img alt="placeholder text" src={imageUrl(poster)} />
      <p className="Poster-link">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={fullImageUrl(poster)}
        >
          Full size
        </a>
      </p>
    </figure>
  )
}

const Thumbnail = ({ poster }) => {
  return <img src={thumbUrl(poster)} alt="placeholder text" />
}

export { Thumbnail }

export default Poster
