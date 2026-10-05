import React from 'react'
import { Navigate, useLocation, useSearchParams } from 'react-router-dom'
import api from '../api'
import useGenres from '../hooks/useGenres'
import { InfiniteMovies } from '../components/Infinite/Infinite'
import { HideSeenSwitch } from '../components/Seen/Seen'

const thisYear = new Date().getFullYear()
const years = Array.from({ length: thisYear + 2 - 1920 }, (_, i) => thisYear + 1 - i)
const decades = [...new Set(years.map((year) => year - (year % 10)))]

const sorts = {
  popular: 'Popular',
  top: 'Top rated',
  trending: 'Trending',
}

const Browse = () => {
  const [params, setParams] = useSearchParams()
  const genres = useGenres()

  const genre = params.get('genre') || ''
  const decade = Number(params.get('decade')) || null
  const year = decade ? null : Number(params.get('year')) || null
  const sort = sorts[params.get('sort')] ? params.get('sort') : 'popular'
  const period = decade ? `${decade}s` : year ? String(year) : ''

  const update = (changes) => {
    const next = new URLSearchParams(params)
    Object.entries(changes).forEach(([key, value]) =>
      value ? next.set(key, value) : next.delete(key)
    )
    setParams(next)
  }

  const onPeriod = (value) => {
    if (value.startsWith('d')) update({ decade: value.slice(1), year: null })
    else update({ year: value, decade: null })
  }

  const genreName = genres.find((g) => String(g.id) === genre)?.name
  const title = [sorts[sort], genreName, period && `of ${period}`]
    .filter(Boolean)
    .join(' ')

  const fetchPage = (page) => api.browse({ genre, year, decade, sort, page })

  return (
    <section className="Page">
      <div className="Page-head">
        <div>
          <span className="Eyebrow">Browse</span>
          <h1>{title}</h1>
        </div>
      </div>

      <form className="Toolbar" onSubmit={(event) => event.preventDefault()}>
        <label className="Field">
          Genre
          <select
            value={genre}
            onChange={(event) => update({ genre: event.target.value })}
          >
            <option value="">All genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </label>

        <label className="Field">
          Year or decade
          <select
            value={decade ? `d${decade}` : year || ''}
            onChange={(event) => onPeriod(event.target.value)}
          >
            <option value="">Any time</option>
            <optgroup label="Decades">
              {decades.map((d) => (
                <option key={d} value={`d${d}`}>
                  {d}s
                </option>
              ))}
            </optgroup>
            <optgroup label="Years">
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </optgroup>
          </select>
        </label>

        <fieldset className="Field Field--plain">
          <legend>Sort</legend>
          <div className="Segmented">
            {Object.entries(sorts).map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={sort === id}
                onClick={() => update({ sort: id === 'popular' ? null : id })}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="Toolbar-end">
          <HideSeenSwitch />
        </div>
      </form>

      {sort === 'trending' && period && (
        <p className="Muted">
          Trending is a this-week list, so with a year or decade this shows the
          most popular movies of {period}.
        </p>
      )}

      <InfiniteMovies
        key={`${genre}-${year}-${decade}-${sort}`}
        fetchPage={fetchPage}
      />
    </section>
  )
}

const ToBrowse = ({ sort }) => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  if (sort) params.set('sort', sort)
  return <Navigate replace to={`/browse?${params}`} />
}

export { ToBrowse }

export default Browse
