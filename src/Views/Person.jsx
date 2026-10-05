import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import api from '../api'
import useAsync from '../hooks/useAsync'
import { useVisit } from '../components/Trail/useTrail'
import { MovieGrid } from '../components/Card/MovieCard'
import { HideSeenSwitch } from '../components/Seen/Seen'
import { byNewest, byRating, image } from '../lib/format'
import './Person.css'

const jobOrder = ['Director', 'Writing']
const writingJobs = ['Writer', 'Screenplay', 'Story', 'Novel', 'Author']

const groupCrew = (crew) => {
  const groups = new Map()
  crew.forEach((credit) => {
    const job = writingJobs.includes(credit.job) ? 'Writing' : credit.job
    const group = groups.get(job) || new Map()
    group.set(credit.id, credit)
    groups.set(job, group)
  })

  return [...groups.entries()]
    .map(([job, credits]) => [job, [...credits.values()]])
    .sort(([a, aList], [b, bList]) => {
      const rank = (job) =>
        jobOrder.includes(job) ? jobOrder.indexOf(job) : jobOrder.length
      return rank(a) - rank(b) || bList.length - aList.length
    })
}

const Bio = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false)
  if (!text) return null
  const isLong = text.length > 520

  return (
    <div className="Bio">
      <p
        id="person-bio"
        className={isLong && !isOpen ? 'Bio-text is-clamped' : 'Bio-text'}
      >
        {text}
      </p>
      {isLong && (
        <button
          type="button"
          className="Button"
          aria-expanded={isOpen}
          aria-controls="person-bio"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Show less' : 'Read full bio'}
        </button>
      )}
    </div>
  )
}

const CreditSection = ({ title, credits, sort, notes }) => (
  <section className="Person-section">
    <h2 className="Person-section-title">
      {title} <span className="Person-count">{credits.length}</span>
    </h2>
    <MovieGrid
      movies={[...credits].sort(sort === 'rating' ? byRating : byNewest)}
      notes={notes}
    />
  </section>
)

const Person = () => {
  const { personId } = useParams()
  const [params, setParams] = useSearchParams()
  const sort = params.get('sort') === 'rating' ? 'rating' : 'newest'
  const { data: person, error } = useAsync(
    () => api.fetchPerson(personId),
    [personId]
  )
  useVisit(String(person?.id) === personId && person.name)

  if (error) {
    return <p className="Status">Could not load person: {error}</p>
  }

  if (!person) {
    return (
      <p className="Status" role="status">
        Loading…
      </p>
    )
  }

  const isActor = person.known_for_department === 'Acting'
  const cast = [...new Map(person.cast.map((c) => [c.id, c])).values()]
  const characters = Object.fromEntries(
    cast.filter((c) => c.character).map((c) => [c.id, `as ${c.character}`])
  )
  const castSection = cast.length > 0 && (
    <CreditSection
      key="cast"
      title="Acting"
      credits={cast}
      sort={sort}
      notes={characters}
    />
  )
  const crewSections = groupCrew(person.crew).map(([job, credits]) => (
    <CreditSection key={job} title={job} credits={credits} sort={sort} />
  ))
  const photo = image(person.profile_path, 'h632')
  const born = [person.birthday?.slice(0, 4), person.place_of_birth]
    .filter(Boolean)
    .join(', ')

  return (
    <article className="Page Person">
      <header className="Person-hero">
        <div className="Person-photo">
          {photo ? (
            <img
              src={photo}
              alt={`Photo of ${person.name}`}
              width="421"
              height="632"
            />
          ) : (
            <span className="Card-fallback" aria-hidden="true">
              {person.name}
            </span>
          )}
        </div>
        <div className="Person-body">
          <span className="Eyebrow">{person.known_for_department}</span>
          <h1 className="Person-name">{person.name}</h1>
          {born && <p className="Muted">Born {born}</p>}
          <Bio text={person.biography} />
        </div>
      </header>

      <div className="Toolbar">
        <div className="Segmented" role="group" aria-label="Sort credits">
          {[
            ['newest', 'Newest'],
            ['rating', 'Rating'],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={sort === id}
              onClick={() =>
                setParams(id === 'rating' ? { sort: 'rating' } : {}, {
                  replace: true,
                })
              }
            >
              {label}
            </button>
          ))}
        </div>
        <div className="Toolbar-end">
          <HideSeenSwitch />
        </div>
      </div>

      {isActor ? [castSection, ...crewSections] : [...crewSections, castSection]}
    </article>
  )
}

export default Person
