import React, { createContext, useState, useEffect } from 'react'

const API_KEY = process.env.REACT_APP_API_KEY

export const TrendingContext = createContext()

export const TrendingProvider = ({ children }) => {
  const [trending, setTrending] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const cachedTrending = localStorage.getItem('trendingData')
      const cachedTimestamp = localStorage.getItem('trendingTimestamp')

      if (cachedTrending && cachedTimestamp) {
        const storedTime = new Date(parseInt(cachedTimestamp, 10))
        const currentTime = new Date()
        const timeDiff = Math.abs(currentTime - storedTime)
        const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60))

        if (hoursDiff < 12) {
          setTrending(JSON.parse(cachedTrending))
          setLoading(false)
          return
        }
      }

      const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`

      try {
        setLoading(true)

        const res = await (
          await fetch(url, {
            headers: {
              accept: 'application/json',
            },
          })
        ).json()

        setLoading(false)

        setTrending(res.results)

        localStorage.setItem('trendingData', JSON.stringify(res.results))
        localStorage.setItem(
          'trendingTimestamp',
          new Date().getTime().toString()
        )
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <TrendingContext.Provider value={{ trending, loading }}>
      {children}
    </TrendingContext.Provider>
  )
}
