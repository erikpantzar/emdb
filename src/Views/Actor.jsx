import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import ActorPresentation from '../components/Actor/ActorPresentation'
import { useVisit } from '../components/Trail/useTrail'

const Actor = () => {
  const { personId } = useParams()
  const [actor, setActor] = useState()
  const [error, setError] = useState()
  useVisit(String(actor?.id) === personId && actor.name)

  useEffect(() => {
    let active = true
    setActor(undefined)
    setError(undefined)

    api
      .fetchPerson(personId)
      .then((res) => active && setActor(res))
      .catch((err) => active && setError(err.message))

    return () => {
      active = false
    }
  }, [personId])

  if (error) {
    return <div>Could not load person: {error}</div>
  }

  if (!actor) {
    return <div>Loading...</div>
  }

  return <ActorPresentation actor={actor} />
}

export default Actor
