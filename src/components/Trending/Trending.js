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
      <h1 className="trending-title">Trending Tv & Movies</h1>

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
