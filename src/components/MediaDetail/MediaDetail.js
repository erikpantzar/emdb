import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MediaContext } from './MediaContext'
import Trailers from './Trailers'
import { TrendingCard } from '../MediaCard/MediaCard'
import Ratings from '../Ratings/Ratings'
import './MediaDetail.css'

const big = (url) => `https://image.tmdb.org/t/p/original${url}`
const profile = (url) => `https://image.tmdb.org/t/p/w200${url}`

const MediaDetail = ({ match }) => {
  const { id, media } = match.params

  // Access mediaData and loading status from the context
  const { mediaData, loading, getMediaData } = useContext(MediaContext)

  // Example usage: Fetch media data for a specific ID
  useEffect(() => {
    getMediaData(id, media)
    console.log('Running')
    window.scrollTo(0, 0)
    // eslint-disable-next-line
  }, [id])

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <section>
      <div className="details-top-container">
        <header className="details-header">
          <figure className="details-figure">
            <img
              className="details-poster"
              src={big(mediaData.poster_path)}
              alt={mediaData.tagline}
            />
          </figure>
        </header>

        <main className="details-main">
          <Ratings
            average={mediaData.vote_average}
            count={mediaData.vote_count}
          ></Ratings>

          <h1 className="details-title">
            {media === 'tv' ? mediaData.name : mediaData.title}
          </h1>

          <h2 className="details-subtitle details-tagline">
            {mediaData.tagline}
          </h2>

          <p className="details-overview">{mediaData.overview}</p>

          {mediaData.genres && (
            <div className="genres">
              {mediaData.genres.map((genreObj) => (
                <div className="genre" key={genreObj.id}>
                  {genreObj.name}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <div className="details-trailer-wrapper">
        <Trailers trailers={mediaData.trailers} />
      </div>

      {mediaData.credits && (
        <section className="credits">
          <h3>Credits</h3>

          {mediaData.credits.cast && (
            <div>
              <h4>Cast</h4>
              <ul className="credit-container">
                {mediaData.credits.cast.map((person) => (
                  <li className="credit-entry" key={person.name}>
                    <Link to={`/person/${person.id}`}>
                      {person.profile_path ? (
                        <div className="credit-img-container">
                          <img
                            src={profile(person.profile_path)}
                            alt={person.name}
                            className="credit-img"
                          />
                        </div>
                      ) : (
                        <div className="credit-img-container"></div>
                      )}

                      {person.character ? (
                        <>
                          <h4 className="credit-character">
                            {person.character}
                          </h4>
                          <h5 className="credit-played">
                            <span
                              style={{ fontStyle: 'italic', fontWeight: 100 }}
                            >
                              played by
                            </span>{' '}
                            <span className="credit-name">{person.name}</span>
                          </h5>
                        </>
                      ) : (
                        <h5 className="credit-played">
                          <span className="credit-name">{person.name}</span>
                        </h5>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {mediaData.similar.results.length > 0 && (
        <aside className="details-similar">
          <h2>Similar</h2>

          <section className="trending-list">
            {mediaData.similar.results.map((item) => (
              <TrendingCard item={item} mediaType={media} key={item.id} />
            ))}
          </section>
        </aside>
      )}
    </section>
  )
}

export default MediaDetail
