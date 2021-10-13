import React from 'react'
import { Link } from 'react-router-dom'
import './Credits.css'

const Credits = ({ credits }) => {
  return (
    <div>
      <h2>Cast</h2>

      <section className="Credit-list">
        {credits.cast.slice(0, 15).map((cred) => (
          <CreditsItem
            key={cred.id}
            name={cred.name}
            img={cred.profile_path}
            id={cred.id}
          />
        ))}
      </section>
    </div>
  )
}

const CreditsItem = ({ img, name, id }) => {
  return (
    <div className="Credit">
      <Link to={`/actor/${id}`}>
        {img ? (
          <figure className="Credit-figure">
            <img src={`https://image.tmdb.org/t/p/w92${img}`} alt={name} />
          </figure>
        ) : (
          <div className="Credit-placeholder" />
        )}

        <p className="Credit-name">{name}</p>
      </Link>
    </div>
  )
}

export default Credits
