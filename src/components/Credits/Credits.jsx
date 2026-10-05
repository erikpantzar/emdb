import React from 'react'
import { Link } from 'react-router-dom'
import './Credits.css'

const keyJobs = [
  'Director',
  'Screenplay',
  'Writer',
  'Original Music Composer',
  'Director of Photography',
]

const Credits = ({ credits }) => {
  const crew = keyJobs
    .map((job) => [job, credits.crew.filter((person) => person.job === job)])
    .filter(([, people]) => people.length > 0)

  return (
    <div>
      {crew.length > 0 && (
        <dl className="Crew-list">
          {crew.map(([job, people]) => (
            <div key={job} className="Crew-item">
              <dt>{job}</dt>
              {people.map((person) => (
                <dd key={person.credit_id}>
                  <Link to={`/person/${person.id}`}>{person.name}</Link>
                </dd>
              ))}
            </div>
          ))}
        </dl>
      )}

      <h2>Cast</h2>

      <section className="Credit-list">
        {credits.cast.slice(0, 15).map((cred) => (
          <CreditsItem
            key={cred.credit_id}
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
      <Link to={`/person/${id}`}>
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
