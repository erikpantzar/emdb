import React from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api'
import { InfiniteList } from '../components/Infinite/Infinite'
import { PeopleGrid } from '../components/PersonCard/PersonCard'
import QueryForm from '../components/QueryForm/QueryForm'

const isActor = (person) => person.known_for_department === 'Acting'
const isCreator = (person) => !isActor(person)

const PeopleHub = ({ title, lede, isMatch }) => {
  const [params] = useSearchParams()
  const query = params.get('q') || ''

  const fetchPage = async (page) => {
    const res = query
      ? await api.searchPerson(query, page)
      : await api.popularPeople(page)
    return { ...res, results: res.results.filter(isMatch) }
  }

  return (
    <section className="Page">
      <div className="Page-head">
        <div>
          <span className="Eyebrow">{query ? `Results for “${query}”` : lede}</span>
          <h1>{title}</h1>
        </div>
      </div>
      <QueryForm label={`Find ${title.toLowerCase()}`} />

      <InfiniteList key={query} fetchPage={fetchPage}>
        {(people) => <PeopleGrid people={people} />}
      </InfiniteList>
    </section>
  )
}

const Creators = () => (
  <PeopleHub
    title="Creators"
    lede="Directors, writers, composers"
    isMatch={isCreator}
  />
)

const Actors = () => (
  <PeopleHub title="Actors" lede="Popular right now" isMatch={isActor} />
)

export { Creators, Actors }
