import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const API_KEY = process.env.REACT_APP_API_KEY

// w
// const thumbUrl = (id) => `https://image.tmdb.org/t/p/w1200${id}`
const big = (url) => `https://image.tmdb.org/t/p/original${url}`

export default ({ match }) => {
  const { id, media } = match.params
  const valid = (id && media === 'tv') || media === 'movie'
  if (!valid) {
    return <div>Something is wrong...!</div>
  }

  const [isMovie] = useState(media === 'movie')
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits,similiar,images,videos`

      try {
        const movie = await (await fetch(url)).json()

        let trailers = []

        if (movie.videos) {
          movie.videos.results.map((video) => {
            trailers.push(video)
          })
        }

        setData({ ...movie, trailers })
        setLoading(false)
      } catch (err) {
        console.error(err)
      }
    }

    const fetchTv = async () => {
      const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos,images&language=en-US`
      // const snd = `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${API_KEY}`

      try {
        const res = await (await fetch(url)).json()
        setData({ ...res })

        setLoading(false)
      } catch (err) {
        console.errror(err)
        setLoading(false)
      }
    }

    if (isMovie) {
      fetchDetails()
    } else {
      fetchTv()
    }
  }, [isMovie, id, media])

  if (!data) {
    return <div>Loading</div>
  }

  return (
    <section>
      <aside>
        <Link to="/">Back</Link>
      </aside>
      <header>
        <figure>
          <img src={big(data.poster_path)} alt={data.tagline} />
        </figure>

        {data.trailers && <Trailers trailers={data.trailers} />}
      </header>

      <main>
        <h1>{data.title}</h1>

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
          Tagline:
          <span>{data.tagline}</span>
        </div>

        <p>{data.overview}</p>
      </main>
    </section>
  )
}

const Trailers = ({ trailers }) => {
  if (!trailers) {
    return null
  }

  return (
    <div className="trailers">
      {trailers &&
        trailers
          //.filter((v) => v.site === 'YouTube')
          .splice(0, 1)
          .map((video, idx) => (
            <iframe
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
