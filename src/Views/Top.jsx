import React from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api'
import InfiniteMovies from '../components/InfiniteMovies/InfiniteMovies'
import './Tabs.css'

const thisYear = new Date().getFullYear()
const years = Array.from({ length: thisYear - 1919 }, (_, i) => thisYear - i)
const decades = [...new Set(years.map((year) => year - (year % 10)))]

const Top = () => {
  const [params, setParams] = useSearchParams()
  const decade = Number(params.get('decade')) || null
  const year = decade ? null : Number(params.get('year')) || thisYear - 1

  const fetchPage = decade
    ? (page) => api.topOfDecade(decade, page)
    : (page) => api.topOfYear(year, page)

  return (
    <section>
      <h1>Best of {decade ? `the ${decade}s` : year}</h1>

      <div className="Tabs">
        <label>
          Year{' '}
          <select
            value={year || ''}
            onChange={(event) => setParams({ year: event.target.value })}
          >
            <option value="">-</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>

        <label>
          Decade{' '}
          <select
            value={decade || ''}
            onChange={(event) => setParams({ decade: event.target.value })}
          >
            <option value="">-</option>
            {decades.map((d) => (
              <option key={d} value={d}>
                {d}s
              </option>
            ))}
          </select>
        </label>
      </div>

      <InfiniteMovies
        key={decade ? `decade-${decade}` : `year-${year}`}
        fetchPage={fetchPage}
      />
    </section>
  )
}

export default Top
