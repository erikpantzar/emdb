import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Search.css'

const API_KEY = process.env.REACT_APP_API_KEY

const Search = () => {
  const [searchInput, setSearchInput] = useState('')
  // const [selectValue, setSelectValue] = useState('tv') // Default value
  const [searchResults, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showResults, setShowresults] = useState(false)

  useEffect(() => {
    // Function to perform the fetch request
    const fetchData = async () => {
      // Check if searchInput is empty or less than 3 characters
      if (searchInput.trim().length < 3) {
        return // Exit early if searchInput is empty or less than 3 characters
      }

      // Perform your fetch request here using the query
      // Example:
      try {
        setLoading(true)
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchInput}`
        )
        const data = await response.json()
        setResults(data)
        console.log(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    // Timeout ID variable
    let timeoutId

    // Timeout function to wait 400ms before fetching data
    const handleTimeout = () => {
      timeoutId = setTimeout(() => {
        fetchData()
      }, 400)
    }

    // Trigger handleTimeout whenever searchInput or selectValue changes
    handleTimeout()

    // Clear timeout on cleanup to prevent memory leaks
    return () => {
      clearTimeout(timeoutId)
    }
  }, [searchInput])

  useEffect(() => {
    console.log('running')
    if (searchInput.trim().length > 2 && searchResults) {
      console.log('show')
      setShowresults(true)
    } else {
      console.log('hide')
      setShowresults(false)
    }
  }, [searchInput, searchResults, loading])

  const handleSubmit = (event) => {
    event.preventDefault()
    // You can perform any action needed when the form is submitted
  }

  const clearSearch = () => {
    setSearchInput('')
    setResults(null)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`search-container ${showResults ? 'visible' : ''}`}
      >
        <div className="search-form">
          <input
            tabIndex="1"
            type="text"
            className={`search-input ${
              searchInput.length > 0 ? 'touched' : 'pristine'
            }`}
            placeholder="Search for.."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        {searchResults && searchResults.results.length > 0 && (
          <Results results={searchResults} clearSearch={clearSearch} />
        )}
        <div
          className="search-backdrop"
          onClick={() => setShowresults(false)}
        ></div>
      </form>
    </>
  )
}

export default Search

const Results = ({ results, clearSearch }) => {
  return (
    <section className="search-results">
      <h2>Results</h2>

      {results.results.map((res) => (
        <div key={res.id}>
          <Link
            to={`/m/${res.title ? 'movie' : 'tv'}/${res.id}`}
            onClick={clearSearch}
          >
            {res.title ? res.title : res.name}
          </Link>
        </div>
      ))}
    </section>
  )
}
