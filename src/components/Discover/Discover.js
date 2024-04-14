import React, { useEffect, useState } from 'react'
import MediaCard from '../MediaCard/MediaCard'

const API_KEY = process.env.REACT_APP_API_KEY

const Discover = ({ match }) => {
  console.log(match)

  const { media, tag } = match.params

  const [data, setData] = useState([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `https://api.themoviedb.org/3/discover/${media}?api_key=${API_KEY}&with_genres=${tag}&sort_by=popularity.desc&vote_count.gte=2`
        const res = await fetch(url)
        const data = await res.json()
        setloading(false)
        setData(data)
      } catch (err) {
        console.error(err)
        setloading(false)
      }
    }

    fetchData()

    // scrolling to top
    document.body.scrollIntoView()

    // eslint-disable-next-line
  }, [tag])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <article>
      <header className="page-header">
        <h1 className="page-title">Discover</h1>
        <p>Find something in this category</p>
      </header>

      {data.results && (
        <div className="card-list">
          {data.results.map((item) => (
            <MediaCard item={item} key={item.id} mediaType={media} />
          ))}
        </div>
      )}
    </article>
  )
}

export default Discover
