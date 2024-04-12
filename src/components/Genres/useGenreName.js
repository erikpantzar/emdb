import { useContext } from 'react'
import { GenreContext } from './genresContext'

const useGenreName = (genreId) => {
  const { genres } = useContext(GenreContext)

  const getGenreName = () => {
    const genre = genres.find((genre) => genre.id === genreId)
    return genre ? genre.name : null
  }

  return getGenreName()
}

export default useGenreName
