import React from 'react'
import api from '../../api'
import InfiniteMovies from '../InfiniteMovies/InfiniteMovies'

const fetchPage = (page) => api.trending({ page })

const Trending = () => (
  <section>
    <h1>Trending</h1>
    <InfiniteMovies fetchPage={fetchPage} />
  </section>
)

export default Trending
