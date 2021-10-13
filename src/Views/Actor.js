import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api'
import ActorPresentation from '../components/Actor/ActorPresentation'

const Actor = () => {
  const { personId } = useParams()
  const [isLoading, setLoading] = useState(true)
  const [actor, setActor] = useState()

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const res = await api.fetchPerson(personId)
      setActor(res)
      setLoading(false)
    }

    fetch()

    return () => {
      return false
    }
  }, [personId])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <ActorPresentation actor={actor} />
}

export default Actor
