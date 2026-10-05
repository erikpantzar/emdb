import React, { useId } from 'react'
import { useSearchParams } from 'react-router-dom'

const QueryForm = ({ label }) => {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const id = useId()

  return (
    <form
      key={query}
      role="search"
      className="Toolbar"
      onSubmit={(event) => {
        event.preventDefault()
        const value = new FormData(event.target).get('q').trim()
        setParams(value ? { q: value } : {})
      }}
    >
      <label className="Field" htmlFor={id}>
        {label}
        <input
          id={id}
          name="q"
          type="search"
          className="Input"
          defaultValue={query}
        />
      </label>
      <button type="submit" className="Button Button--primary">
        Search
      </button>
    </form>
  )
}

export default QueryForm
