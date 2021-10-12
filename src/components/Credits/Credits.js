import React from 'react'
import { Link } from 'react-router-dom'
import './Credits.css'

const Credits = ({ img, name, id }) => {
  return (
    <section className="Credit">
      {img ? (
        <figure className="Credit-figure">
          <img src={`https://image.tmdb.org/t/p/w92${img}`} alt={name} />
        </figure>
      ) : (
        <div className="Credit-placeholder" />
      )}

      <Link to={`/actor/${id}`}>
        <p className="Credit-name">{name}</p>
      </Link>
    </section>
  )
}

export default Credits
