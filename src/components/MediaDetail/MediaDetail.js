import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MediaContext } from './MediaContext'
import Trailers, { TrailerHeader } from './Trailers'
import { TrendingCard } from '../MediaCard/MediaCard'
import Ratings from '../Ratings/Ratings'
import { ElementInView } from '../Nav/Nav'
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
    window.scrollTo(0, 0)
    // eslint-disable-next-line
  }, [id])

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <>
      <ElementInView />
      <article
        id={'top'}
        datalabel={mediaData.title ? mediaData.title : mediaData.name}
      >
        {mediaData.trailers.length > 0 && (
          <div>
            <TrailerHeader trailers={mediaData.trailers} />
          </div>
        )}
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

        {mediaData.trailers.length > 0 && (
          <div
            className="details-trailer-wrapper"
            id="Trailer"
            datalabel="Trailer"
          >
            <Trailers trailers={mediaData.trailers} />
          </div>
        )}

        {mediaData.credits.cast.length > 0 && (
          <section className="credits" id="credits">
            <h3>Credits</h3>

            {mediaData.credits.cast && (
              <div>
                <h4>Cast</h4>
                <ul className="credit-container">
                  {mediaData.credits.cast.map((person, i) => (
                    <li className="credit-entry" key={`${person.id}-cast-${i}`}>
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

        {mediaData.credits.crew.length > 0 && (
          <section className="credits">
            {mediaData.credits.crew && (
              <div id="crew">
                <h4>Crew</h4>
                <ul className="credit-container">
                  {mediaData.credits.crew.map((person, i) => (
                    <li className="credit-entry" key={`${person.id}-${i}`}>
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

                        <h5 className="credit-played">
                          <span className="credit-name">
                            {person.name} - {person.job}
                          </span>
                        </h5>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {mediaData.similar.results.length > 0 && (
          <aside className="details-similar" datalabel="Similar" id="similar">
            <h2>
              Here are similar {media === 'tv' ? 'TV shows' : 'movies'} like{' '}
              {mediaData.title ? mediaData.title : mediaData.name}
            </h2>

            <section className="trending-list">
              {mediaData.similar.results.map((item) => (
                <TrendingCard item={item} mediaType={media} key={item.id} />
              ))}
            </section>
          </aside>
        )}
      </article>
    </>
  )
}

export default MediaDetail
