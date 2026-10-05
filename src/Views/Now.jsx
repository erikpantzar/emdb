import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../api'
import InfiniteMovies from '../components/InfiniteMovies/InfiniteMovies'
import '../styles/Tabs.css'

const tabs = {
  playing: { label: 'In cinemas', fetchPage: api.nowPlaying },
  upcoming: { label: 'Upcoming', fetchPage: api.upcoming },
}

const Now = () => {
  const [params] = useSearchParams()
  const tab = tabs[params.get('tab')] ? params.get('tab') : 'playing'

  return (
    <section>
      <h1>Now</h1>

      <nav className="Tabs">
        {Object.entries(tabs).map(([id, { label }]) => (
          <Link
            key={id}
            to={id === 'playing' ? '/now' : `/now?tab=${id}`}
            className={id === tab ? 'Tabs-item is-active' : 'Tabs-item'}
          >
            {label}
          </Link>
        ))}
      </nav>

      <InfiniteMovies key={tab} fetchPage={tabs[tab].fetchPage} />
    </section>
  )
}

export default Now
