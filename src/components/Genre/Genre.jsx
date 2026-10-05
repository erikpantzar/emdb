import React, { useState, useEffect } from "react"
import api from "../../api"

import "./Genre.css"

const Genre = () => {
  const [genres, setGenres] = useState([])
  const [selected, setSelected] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.genres()
      setIsLoading(false)
      setGenres(res.genres)
    }

    fetchData()
  }, [])

  const selectGenre = (genreId) => {
    if (selected.indexOf(genreId) === -1) {
      // if not in the list of selected, add it to the list
      setSelected([...selected, genreId])

    } else {
      // remove it from the list
      setSelected(
        selected.filter(genre => genre !== genreId)
      )
    }
  }

  const isSelected = ( genreId ) => {
    return selected.indexOf(genreId) > -1
  }

  return (
    <div>
      {isLoading && <div>Loading genres...</div>}

      <ul className="genre-list">
        {genres.map((genre) => (
          <li key={genre.id} className="genre-item">
            <button type="button" onClick={() => selectGenre(genre.id)}>
              {genre.name} {isSelected(genre.id) ? 'selected' : null}
            </button>

            {/*<Link to={`/genre/${genre.id}`}>{genre.name}</Link>*/}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Genre
