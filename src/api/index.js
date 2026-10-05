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
  const { credits, similar, recommendations, keywords, ...movie } = await get(
    `/movie/${movieId}`,
    {
      append_to_response: 'credits,similar,recommendations,keywords',
    }
  )

  return {
    movie,
    credits,
    similar,
    recommendations,
    keywords: keywords.keywords,
  }
}

const fetchPersonCredits = (id) => get(`/person/${id}/movie_credits`)

const fetchGenreRow = (genre, page = 1) =>
  get('/discover/movie', {
    with_genres: genre,
    sort_by: 'popularity.desc',
    'vote_count.gte': 150,
    include_adult: false,
    page,
  })

const decadeRange = (decade) => ({
  'primary_release_date.gte': `${decade}-01-01`,
  'primary_release_date.lte': `${decade + 9}-12-31`,
})

const fetchBrowse = async ({ genre, year, decade, sort, page }) => {
  if (sort === 'trending' && !year && !decade) {
    const res = await get('/trending/movie/week', { page })
    if (!genre) return res
    return {
      ...res,
      results: res.results.filter((movie) =>
        movie.genre_ids?.includes(Number(genre))
      ),
    }
  }

  const params = { include_adult: false, page }
  if (genre) params.with_genres = genre
  if (year) params.primary_release_year = year
  if (decade) Object.assign(params, decadeRange(decade))

  if (sort === 'top') {
    params.sort_by = 'vote_average.desc'
    params['vote_count.gte'] = year ? 200 : decade ? 500 : 1500
  } else {
    params.sort_by = 'popularity.desc'
    params['vote_count.gte'] = 20
  }

  return get('/discover/movie', params)
}

const fetchVideos = (movieId) => get(`/movie/${movieId}/videos`)

const searchPerson = (query, page = 1) =>
  get('/search/person', { query, page, include_adult: false })

const fetchPopularPeople = (page) => get('/person/popular', { page })

const fetchKeyword = (id) => get(`/keyword/${id}`)

const searchKeyword = (query, page) => get('/search/keyword', { query, page })

const fetchMoviesWithKeyword = (id, page) =>
  get('/discover/movie', {
    with_keywords: id,
    sort_by: 'popularity.desc',
    page,
  })

const fetchPerson = async (id) => {
  const person = await get(`/person/${id}`)
  const credits = await get(`/person/${id}/movie_credits`)

  return { ...person, ...credits }
}

const fetchAllGenres = () => get('/genre/movie/list')

const fetchTrending = ({ type = 'movie', time = 'week', page = 1 }) =>
  get(`/trending/${type}/${time}`, { page })

const fetchNowPlaying = (page) => get('/movie/now_playing', { page })

const fetchUpcoming = (page) => get('/movie/upcoming', { page })

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

const fetchTopOfYear = (year, page) =>
  get('/discover/movie', {
    primary_release_year: year,
    sort_by: 'vote_average.desc',
    'vote_count.gte': 300,
    page,
  })

const fetchTopOfDecade = (decade, page) =>
  get('/discover/movie', {
    'primary_release_date.gte': `${decade}-01-01`,
    'primary_release_date.lte': `${decade + 9}-12-31`,
    sort_by: 'vote_average.desc',
    'vote_count.gte': 1000,
    page,
  })

export { get }

export default {
  movie: fetchMovie,
  movieDetails: fetchDetails,
  videos: fetchVideos,

  trending: fetchTrending,
  nowPlaying: fetchNowPlaying,
  upcoming: fetchUpcoming,
  genres: fetchAllGenres,

  fetchPerson: fetchPerson,
  searchPerson: searchPerson,
  popularPeople: fetchPopularPeople,
  keyword: fetchKeyword,
  searchKeyword: searchKeyword,
  moviesWithKeyword: fetchMoviesWithKeyword,
  search: fetchMovie,
  discover: fetchDiscover,
  topOfYear: fetchTopOfYear,
  topOfDecade: fetchTopOfDecade,
  personCredits: fetchPersonCredits,
  genreRow: fetchGenreRow,
  browse: fetchBrowse,
}
