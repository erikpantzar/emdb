import React, { createContext, useState, useEffect } from 'react'

const API_KEY = process.env.REACT_APP_API_KEY

// Create a new context
export const GenreContext = createContext()

// GenreProvider component to manage state and provide data to its children
export const GenreProvider = ({ children }) => {
  // State to store genre data
  const [genres, setGenres] = useState([])
  // State to track if genre data is being loaded
  const [loading, setLoading] = useState(true)

  // Placeholder function to fetch genre data
  const fetchGenres = async () => {
    const cachedGenres = localStorage.getItem('genres')
    if (cachedGenres) {
      setGenres(JSON.parse(cachedGenres))
      setLoading(false)
    } else {
      const movieGenresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      const tvGenresUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`

      try {
        const [movieRes, tvRes] = await Promise.all([
          fetch(movieGenresUrl, { headers: { accept: 'application/json' } }),
          fetch(tvGenresUrl, { headers: { accept: 'application/json' } }),
        ])

        const [movieGenres, tvGenres] = await Promise.all([
          movieRes.json(),
          tvRes.json(),
        ])

        const allGenres = [...movieGenres.genres, ...tvGenres.genres]
        setGenres(allGenres)
        localStorage.setItem('genres', JSON.stringify(allGenres))
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchGenres()
  }, []) // Run once on component mount

  return (
    <GenreContext.Provider value={{ genres, loading }}>
      {children}
    </GenreContext.Provider>
  )
}
