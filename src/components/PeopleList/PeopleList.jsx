import React from 'react'
import { Link } from 'react-router-dom'
import { Thumbnail } from '../Poster/Poster'
import '../MovieList/MovieList.css'

const PeopleList = ({ people = [] }) => (
  <ul className="movie-list">
    {people.map((person) => (
      <li key={person.id}>
        <Link to={`/person/${person.id}`} className="movie-item">
          <Thumbnail poster={person.profile_path} />

          <div className="movie-item-text">
            <h2>{person.known_for_department}</h2>
            <h3 className="movie-item-heading">{person.name}</h3>
          </div>
        </Link>
      </li>
    ))}
  </ul>
)

export default PeopleList
