import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ScrollToTop from './ScrollToTop'
import Nav from './components/Nav/Nav'
import Trail from './components/Trail/Trail'

import Movie from './Views/Movie'
import Home from './Views/Home'
import Now from './Views/Now'
import Top from './Views/Top'
import { Creators, Actors } from './Views/People'
import Themes from './Views/Themes'
import Theme from './Views/Theme'
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
      <Trail />

      <button onClick={() => setSearchVisible(!searchVisible)} type="button">
        Search
      </button>

      <Routes>
        <Route path="/" element={<Now />} />
        <Route path="/now" element={<Now />} />
        <Route path="/top" element={<Top />} />
        <Route path="/trending" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/about" element={<About />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/person/:personId" element={<Actor />} />
        <Route path="/actor/:personId" element={<Actor />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/themes" element={<Themes />} />
        <Route path="/theme/:id" element={<Theme />} />
      </Routes>
    </BrowserRouter>
  )
}
