import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../api'
import { InfiniteMovies } from '../components/Infinite/Infinite'
import { HideSeenSwitch } from '../components/Seen/Seen'

const tabs = {
  playing: { label: 'In cinemas', fetchPage: api.nowPlaying },
  upcoming: { label: 'Upcoming', fetchPage: api.upcoming },
}

const Now = () => {
  const [params] = useSearchParams()
  const tab = tabs[params.get('tab')] ? params.get('tab') : 'playing'

  return (
    <section className="Page">
      <div className="Page-head">
        <div>
          <span className="Eyebrow">Now</span>
          <h1>{tabs[tab].label}</h1>
        </div>
      </div>

      <div className="Toolbar">
        <nav aria-label="Now showing" className="Segmented">
          {Object.entries(tabs).map(([id, { label }]) => (
            <Link
              key={id}
              to={id === 'playing' ? '/now' : `/now?tab=${id}`}
              aria-current={id === tab ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="Toolbar-end">
          <HideSeenSwitch />
        </div>
      </div>

      <InfiniteMovies key={tab} fetchPage={tabs[tab].fetchPage} />
    </section>
  )
}

export default Now
