import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Trending from './components/Trending/Trending'

export default function App() {
  return (
    <Router>
      <Trending></Trending>
    </Router>
  )
}
