import React, { useEffect, useState } from 'react'
import './Trending.css'

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
  const [movieGenres, setMovieGenre] = useState(null)
  const [tvGenres, setTvGenre] = useState(null)

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

    async function listMoviesData() {
      const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`

      try {
        const res = await (
          await fetch(url, {
            headers: {
              accept: 'application/json',
            },
          })
        ).json()

        setMovieGenre(res)
      } catch (err) {
        console.error(err)
      }
    }

    async function listTvData() {
      const url = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`

      try {
        const res = await (
          await fetch(url, {
            headers: {
              accept: 'application/json',
            },
          })
        ).json()

        setTvGenre(res)
      } catch (err) {
        console.error(err)
        setTvGenre(null)
      }
    }

    fetchData()
    listMoviesData()
    listTvData()
  }, [])

  return (
    <div>
      <h2>Trending media</h2>

      {loading && '<h3>Loading</h3>'}

      {tvGenres && movieGenres && trending && trending.length > 0 && (
        <section className="trending-list">
          {trending.map((trendItem, idx) => {
            if (trendItem.media_type === 'tv') {
              return (
                <TvCard
                  key={idx}
                  item={trendItem}
                  genres={tvGenres.genres}
                ></TvCard>
              )
            } else {
              return (
                <MovieCard
                  key={idx}
                  item={trendItem}
                  genres={movieGenres.genres}
                ></MovieCard>
              )
            }
          })}
        </section>
      )}
    </div>
  )
}

const thumbUrl = (id) => `https://image.tmdb.org/t/p/w300/${id}`

const TvCard = ({ item, genres }) => (
  <article className="card card-tv" key={item.id}>
    <div className="card-media-type">TV</div>

    <header>
      <h2 className="card-title">{item.name}</h2>
      {item.release_date && <span>Released: {item.release_date}</span>}
      <p>{item.overview}</p>

      <div className="genres">
        {item.genre_ids.map((genreId) => (
          <div className="card-tag genre">{matchGenre(genreId, genres)}</div>
        ))}
      </div>
    </header>

    <Thumbnail poster={item.poster_path} />
  </article>
)

const MovieCard = ({ item, genres }) => (
  <article className="card card-movie" key={item.id}>
    <div className="card-media-type">Movie</div>

    <header>
      <h2 className="card-title">{item.title}</h2>
      {item.release_date && <span>Released: {item.release_date}</span>}
      <p>{item.overview}</p>

      <div className="genres">
        {item.genre_ids.map((genreId) => (
          <div className="card-tag genre">{matchGenre(genreId, genres)}</div>
        ))}
      </div>
    </header>
    <Thumbnail poster={item.poster_path} />
  </article>
)

const Thumbnail = ({ poster }) => {
  return <img src={thumbUrl(poster)} alt="placeholder text" />
}
