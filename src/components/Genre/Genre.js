import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../api"

import "./Genre.css"

const Genre = () => {
  const [genres, setGenres] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.genres()
      setIsLoading(false)
      setGenres(res.genres)
    }

    fetchData()
  }, [])

  return (
    <div>
      {isLoading && <div>Loading genres...</div>}

      <ul className="genre-list">
        {genres.map((genre) => (
          <li key={genre.id} className="genre-item">
            <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Genre
