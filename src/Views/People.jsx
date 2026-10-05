import React from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api'
import InfiniteList from '../components/InfiniteList/InfiniteList'
import PeopleList from '../components/PeopleList/PeopleList'
import QueryForm from '../components/QueryForm/QueryForm'

const isActor = (person) => person.known_for_department === 'Acting'
const isCreator = (person) => !isActor(person)

const PeopleHub = ({ title, isMatch }) => {
  const [params] = useSearchParams()
  const query = params.get('q') || ''

  const fetchPage = async (page) => {
    const res = query
      ? await api.searchPerson(query, page)
      : await api.popularPeople(page)
    return { ...res, results: res.results.filter(isMatch) }
  }

  return (
    <section>
      <h1>{title}</h1>
      <QueryForm placeholder={`Search ${title.toLowerCase()}`} />

      <InfiniteList key={query} fetchPage={fetchPage}>
        {(people) => <PeopleList people={people} />}
      </InfiniteList>
    </section>
  )
}

const Creators = () => <PeopleHub title="Creators" isMatch={isCreator} />
const Actors = () => <PeopleHub title="Actors" isMatch={isActor} />

export { Creators, Actors }
