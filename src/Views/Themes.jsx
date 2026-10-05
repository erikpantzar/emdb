import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../api'
import { InfiniteList } from '../components/Infinite/Infinite'
import QueryForm from '../components/QueryForm/QueryForm'

const starters = [
  { id: 4379, name: 'time travel' },
  { id: 4565, name: 'dystopia' },
  { id: 10051, name: 'heist' },
  { id: 9748, name: 'revenge' },
  { id: 10714, name: 'serial killer' },
  { id: 310, name: 'artificial intelligence (a.i.)' },
  { id: 7312, name: 'road trip' },
  { id: 10683, name: 'coming of age' },
  { id: 12377, name: 'zombie' },
  { id: 12190, name: 'cyberpunk' },
  { id: 9807, name: 'film noir' },
  { id: 3358, name: 'haunted house' },
  { id: 10349, name: 'survival' },
  { id: 10854, name: 'time loop' },
  { id: 779, name: 'martial arts' },
  { id: 3801, name: 'space travel' },
  { id: 163053, name: 'found footage' },
  { id: 1415, name: 'small town' },
  { id: 14909, name: 'alien invasion' },
  { id: 4458, name: 'post-apocalyptic future' },
  { id: 818, name: 'based on novel or book' },
  { id: 5565, name: 'biography' },
  { id: 207317, name: 'christmas' },
]

const ThemeChips = ({ themes }) => (
  <ul className="Chips Chips--large">
    {themes.map((theme) => (
      <li key={theme.id}>
        <Link to={`/theme/${theme.id}`} className="Chip">
          {theme.name}
        </Link>
      </li>
    ))}
  </ul>
)

const Themes = () => {
  const [params] = useSearchParams()
  const query = params.get('q') || ''

  return (
    <section className="Page">
      <div className="Page-head">
        <div>
          <span className="Eyebrow">
            {query ? `Results for “${query}”` : 'Start somewhere'}
          </span>
          <h1>Themes</h1>
        </div>
      </div>
      <QueryForm label="Find a theme" />

      {query ? (
        <InfiniteList
          key={query}
          fetchPage={(page) => api.searchKeyword(query, page)}
        >
          {(themes) => <ThemeChips themes={themes} />}
        </InfiniteList>
      ) : (
        <ThemeChips themes={starters} />
      )}
    </section>
  )
}

export default Themes
