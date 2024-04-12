import React, { useEffect, useState } from 'react'
import './Trending.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const API_KEY = process.env.REACT_APP_API_KEY

// general helper
// put in util ?
const matchGenre = (id, genres) => {
  for (let genre of genres) {
    if (id === genre.id) {
      return genre.name
    }
  }

  return null
}

export default () => {
  const [loading, setLoading] = useState(false)
  const [trending, setTrending] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    async function fetchData() {
      const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`

      try {
        setLoading(true)

        const res = await (
          await fetch(url, {
            headers: {
              accept: 'application/json',
            },
          })
        ).json()

        setLoading(false)

        setTrending(res.results)
      } catch (err) {
        console.error(err)
        setInterval([])
      }
    }

    async function fetchGenres() {
      const movieGenresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      const tvGenresUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`

      try {
        const [movieRes, tvRes] = await Promise.all([
          fetch(movieGenresUrl, { headers: { accept: 'application/json' } }),
          fetch(tvGenresUrl, { headers: { accept: 'application/json' } }),
        ])

        const [movieGenres, tvGenres] = await Promise.all([
          movieRes.json(),
          tvRes.json(),
        ])

        setGenres([...movieGenres.genres, ...tvGenres.genres])
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
    fetchGenres()
  }, [])

  return (
    <div>
      <h2>Trending Tv & Movies</h2>

      {loading && '<h3>Loading</h3>'}

      {genres && trending && trending.length > 0 && (
        <section className="trending-list">
          {trending.map((trendItem, idx) => {
            return (
              <Card
                key={idx}
                item={trendItem}
                genres={genres}
                mediaType={trendItem.media_type}
              />
            )
          })}
        </section>
      )}
    </div>
  )
}

const thumbUrl = (id) => `https://image.tmdb.org/t/p/w300/${id}`

const Card = ({ item, genres, mediaType }) => (
  <article className={`card card-${mediaType}`} key={item.id}>
    <div className="card-media-type">{mediaType.toUpperCase()}</div>

    <header>
      {mediaType === 'tv' ? (
        <Link to={`/tv/${item.id}`}>
          <h2 className="card-title">{item.name}</h2>
        </Link>
      ) : (
        <Link to={`/movie/${item.id}`}>
          <h2 className="card-title">{item.title}</h2>
        </Link>
      )}
      {item.release_date && (
        <span className="card-release-date">Released: {item.release_date}</span>
      )}
      <div className="card-body-container">
        <p className="card-body">{item.overview}</p>
      </div>

      <div className="genres">
        {item.genre_ids.map((genreId) => (
          <div className="card-tag genre" key={genreId}>
            {matchGenre(genreId, genres)}
          </div>
        ))}
      </div>
    </header>

    <Thumbnail poster={item.poster_path} />
  </article>
)

const Thumbnail = ({ poster }) => {
  return <img src={thumbUrl(poster)} alt="placeholder text" />
}
