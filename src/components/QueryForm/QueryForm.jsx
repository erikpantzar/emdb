import React from 'react'
import { useSearchParams } from 'react-router-dom'

const QueryForm = ({ placeholder }) => {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''

  return (
    <form
      key={query}
      onSubmit={(event) => {
        event.preventDefault()
        const value = new FormData(event.target).get('q').trim()
        setParams(value ? { q: value } : {})
      }}
    >
      <input name="q" defaultValue={query} placeholder={placeholder} />
      <button type="submit">Search</button>
    </form>
  )
}

export default QueryForm
