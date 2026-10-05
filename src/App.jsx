import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ScrollToTop from './ScrollToTop'
import Nav from './components/Nav/Nav'

import Movie from './Views/Movie'
import Home from './Views/Home'
import Discover from './Views/Discover'
import Actor from './Views/Actor'
import About from './Views/About'
import Search from './components/Search/Search'

export default function App() {
  const [searchVisible, setSearchVisible] = useState(false)

  return (
    <BrowserRouter>
      <ScrollToTop />
      {searchVisible && <Search toggleSearch={setSearchVisible} />}

      <Nav />

      <button onClick={() => setSearchVisible(!searchVisible)} type="button">
        Search
      </button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/about" element={<About />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/actor/:personId" element={<Actor />} />
      </Routes>
    </BrowserRouter>
  )
}
