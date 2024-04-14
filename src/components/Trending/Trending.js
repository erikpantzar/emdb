import React, { useContext } from 'react'

import { GenreContext } from '../Genres/genresContext'
import { TrendingContext } from './TrendingContext'
import { TrendingCard } from '../MediaCard/MediaCard'
import './Trending.css'

export default () => {
  const genres = useContext(GenreContext).genres
  const trending = useContext(TrendingContext).trending

  return (
    <article>
      <header className="page-header">
        <h1 className="page-title">Trending Tv & Movies</h1>
        <p>Explore the latest and greatest in movies and TV!</p>
      </header>

      {genres && trending && trending.length > 0 && (
        <section className="trending-list">
          {trending.map((items, idx) => {
            return (
              <TrendingCard
                key={idx}
                item={items}
                mediaType={items.media_type}
              />
            )
          })}
        </section>
      )}
    </article>
  )
}
