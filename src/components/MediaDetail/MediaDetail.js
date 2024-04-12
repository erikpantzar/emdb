import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TrendingCard } from '../MediaCard/MediaCard'
import './MediaDetail.css'

const big = (url) => `https://image.tmdb.org/t/p/original${url}`
const profile = (url) => `https://image.tmdb.org/t/p/w200${url}`

const MediaDetail = ({ match }) => {
  const [data, setData] = useState({})

  const API_KEY = process.env.REACT_APP_API_KEY
  const { id, media } = match.params

  useEffect(() => {
    // movie specific
    const fetchDetails = async () => {
      const url = `https://api.themoviedb.org/3/${media}/${id}?api_key=${API_KEY}&append_to_response=credits,images,videos,similar`

      try {
        const movie = await (await fetch(url)).json()

        let trailers = []

        movie.videos.results.map((video) => trailers.push(video))

        setData({ ...movie, trailers })
      } catch (err) {
        console.error(err)
      }
    }

    fetchDetails()
  })

  if (!data) {
    return <div>Loading</div>
  }

  return (
    <section>
      <aside>
        <Link to="/">Back</Link>
      </aside>
      <header className="details-header">
        <figure className="details-figure">
          <img
            className="details-poster"
            src={big(data.poster_path)}
            alt={data.tagline}
          />
        </figure>

        {data.trailers && <Trailers trailers={data.trailers} />}
      </header>

      <main className="details-main">
        {data.genres && (
          <div className="genres">
            {data.genres.map((genreObj) => (
              <div className="genre" key={genreObj.id}>
                {genreObj.name}
              </div>
            ))}
          </div>
        )}

        <div>
          {data.vote_average} ({data.vote_count})
        </div>

        <h1 className="details-title">
          {media === 'tv' ? data.name : data.title}{' '}
        </h1>

        <h2 className="details-subtitle details-tagline">{data.tagline}</h2>

        <p>{data.overview}</p>

        {data.credits && (
          <section className="credits">
            <h3>Credits</h3>

            {data.credits.cast && (
              <div>
                <h4>Cast</h4>
                <ul className="credit-container">
                  {data.credits.cast.map((person) => (
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
                          <div className="credit-img-containerr"></div>
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
      </main>

      {data.similar && (
        <aside className="details-similar">
          <h2>Similar</h2>

          <section className="trending-list">
            {data.similar.results.map((item) => (
              <TrendingCard item={item} mediaType={media} key={item.id} />
            ))}
          </section>
        </aside>
      )}
    </section>
  )
}

export const Trailers = ({ trailers }) => {
  if (!trailers) {
    return null
  }

  return (
    <div className="trailers">
      {trailers &&
        trailers
          .filter((v) => v.site === 'YouTube')
          .splice(0, 1)
          .map((video, idx) => (
            <iframe
              title={idx}
              key={idx}
              type="text/html"
              width="640"
              height="360"
              src={`https://www.youtube.com/embed/${video.key}?autoplay=0`}
            ></iframe>
          ))}
    </div>
  )
}

export default MediaDetail
