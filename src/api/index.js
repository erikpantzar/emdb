const KEY = "d1540083bbcc86fed537242f04bbf832"
const baseURL = "https://api.themoviedb.org/3"
const key = "api_key=" + KEY

// SEARCH
const fetchMovie = async (movie) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${movie}`

  return await (await fetch(url)).json()
}

const fetchDetails = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}&language=en-US`
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${KEY}&language=en-US`
  const similarUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${KEY}&language=en-US`

  const movie = await (await fetch(url)).json()
  const credits = await (await fetch(creditsUrl)).json()
  const similar = await (await fetch(similarUrl)).json()

  return {
    movie,
    credits,
    similar,
  }
}

const fetchActor = async (name) => {
  const url = `https://api.themoviedb.org/3/search/person?api_key=${KEY}&query=${name}&language=en-US&include_adult=false`
  const res = await (await fetch(url)).json()

  return res
}

const fetchAllGenres = async () => {
  const url = `${baseURL}/genre/movie/list?${key}&language=en-US`
  const res = await (await fetch(url)).json()

  return res
}

const fetchTrending = async (type = "movie", time = "week") => {
  const url = `${baseURL}/trending/${type}/${time}?${key}`
  const res = await (await fetch(url)).json()

  return res
}
// https://api.themoviedb.org/3/search/keyword?api_key=<<api_key>>&page=1
const fetchKeyword = async (keyword) => {
  const url = `${baseURL}/search/keyword?query=${keyword}&${key}&page1`
  const res = await (await fetch(url)).json()
  const keyword_id = res.results[0].id

  const keywordUrl = `${baseURL}/keyword/${keyword_id}/movies?${key}&page1`
  const keywordResponse = await (await fetch(keywordUrl)).json()

  return {
    keyword: res,
    keywordDetail: keywordResponse,
  }
}

// https://developers.themoviedb.org/3/discover/movie-discover
const fetchDiscover = async ({ genres, cast = [], vote = 2, sort = 'popularity.desc' }) => {

  const string = `${baseURL}/discover/movie?${key}` 
    + (genres && '&with_genres=' + genres.toString())
    + (cast && '&with_cast=' + cast.toString())
    + (vote && '&vote_average.gte=' + vote)
    + (sort && '&sort_by=' + sort)

  try {
    const res = await ( await fetch(string) ).json()
    console.log(res.results)
    return res.results
  } catch(error) {
    return error
  }
  
}

export default {
  keyword: fetchKeyword,
  movie: fetchMovie,
  movieDetails: fetchDetails,

  trending: fetchTrending,
  genres: fetchAllGenres,

  searchActor: fetchActor,
  search: fetchMovie,
  discover: fetchDiscover
}
