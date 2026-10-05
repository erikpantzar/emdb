const KEY = import.meta.env.VITE_TMDB_KEY
const baseURL = 'https://api.themoviedb.org/3'

const get = async (path, params = {}) => {
  const query = new URLSearchParams({
    api_key: KEY,
    language: 'en-US',
    ...params,
  })
  const res = await fetch(`${baseURL}${path}?${query}`)

  if (!res.ok) {
    throw new Error(`TMDB ${res.status} on ${path}`)
  }

  return res.json()
}

const fetchMovie = (query) => get('/search/movie', { query })

const fetchDetails = async (movieId) => {
  const { credits, similar, ...movie } = await get(`/movie/${movieId}`, {
    append_to_response: 'credits,similar',
  })

  return { movie, credits, similar }
}

const fetchVideos = (movieId) => get(`/movie/${movieId}/videos`)

const searchPerson = (query) =>
  get('/search/person', { query, include_adult: false })

const fetchPerson = async (id) => {
  const person = await get(`/person/${id}`)
  const credits = await get(`/person/${id}/movie_credits`)

  return { ...person, ...credits }
}

const fetchAllGenres = () => get('/genre/movie/list')

const fetchTrending = ({ type = 'movie', time = 'week', page = 1 }) =>
  get(`/trending/${type}/${time}`, { page })

const fetchDiscover = ({
  genres = [],
  cast = [],
  vote = 2,
  sort = 'popularity.desc',
  page = 1,
}) =>
  get('/discover/movie', {
    with_genres: genres.toString(),
    with_cast: cast.toString(),
    'vote_average.gte': vote,
    sort_by: sort,
    page,
  })

export { get }

export default {
  movie: fetchMovie,
  movieDetails: fetchDetails,
  videos: fetchVideos,

  trending: fetchTrending,
  genres: fetchAllGenres,

  fetchPerson: fetchPerson,
  searchPerson: searchPerson,
  search: fetchMovie,
  discover: fetchDiscover,
}
