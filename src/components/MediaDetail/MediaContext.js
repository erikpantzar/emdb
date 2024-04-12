import React, { createContext, useState, useEffect } from 'react'

export const MediaContext = createContext()

const API_KEY = process.env.REACT_APP_API_KEY

export const MediaProvider = ({ children }) => {
  const [mediaData, setMediaData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchMediaData = async (id, media) => {
    const url = `https://api.themoviedb.org/3/${media}/${id}?api_key=${API_KEY}&append_to_response=credits,images,videos,similar`

    try {
      setLoading(true)

      const response = await fetch(url)
      const mediaData = await response.json()

      let trailers = []
      if (mediaData.videos) {
        trailers = mediaData.videos.results
      }

      setMediaData({ ...mediaData, trailers })
      sessionStorage.setItem(
        `mediaData-${media}-${id}`,
        JSON.stringify({ ...mediaData, trailers })
      )
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const getMediaData = (id, media) => {
    const storedMediaData = sessionStorage.getItem(`mediaData-${media}-${id}`)
    if (storedMediaData) {
      setMediaData(JSON.parse(storedMediaData))
      setLoading(false)
    } else {
      fetchMediaData(id, media)
    }
  }

  useEffect(() => {
    // Reset mediaData when component unmounts
    return () => setMediaData(null)
  }, [])

  return (
    <MediaContext.Provider value={{ mediaData, loading, getMediaData }}>
      {children}
    </MediaContext.Provider>
  )
}
