import React from 'react'
import api from '../api'
import InfiniteMovies from '../components/InfiniteMovies/InfiniteMovies'

const fetchPage = (page) =>
  api.discover({ genres: [28], cast: [62], vote: 1, page })

const Discover = () => (
  <div>
    <h1>Discover</h1>
    <InfiniteMovies fetchPage={fetchPage} />
  </div>
)

export default Discover
