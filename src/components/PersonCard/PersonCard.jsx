import React from 'react'
import { Link } from 'react-router-dom'
import { image } from '../../lib/format'
import '../Card/Card.css'

const PersonCard = ({ person, note }) => {
  const photo = image(person.profile_path, 'w185')

  return (
    <li className="Card Card--person">
      <Link to={`/person/${person.id}`} className="Card-link">
        <span className="Card-poster">
          {photo ? (
            <img
              src={photo}
              alt=""
              width="185"
              height="278"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="Card-fallback" aria-hidden="true">
              {person.name}
            </span>
          )}
        </span>
        <span className="Card-title">{person.name}</span>
        {note && <span className="Card-meta">{note}</span>}
      </Link>
    </li>
  )
}

const PeopleGrid = ({ people }) => (
  <ul className="Grid">
    {people.map((person) => (
      <PersonCard
        key={person.id}
        person={person}
        note={person.known_for_department}
      />
    ))}
  </ul>
)

export { PersonCard, PeopleGrid }
