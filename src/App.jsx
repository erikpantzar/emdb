import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ScrollToTop from './ScrollToTop'
import Header from './components/Header/Header'
import Trail from './components/Trail/Trail'

import Home from './Views/Home'
import Browse, { ToBrowse } from './Views/Browse'
import Now from './Views/Now'
import Movie from './Views/Movie'
import Person from './Views/Person'
import { Creators, Actors } from './Views/People'
import Themes from './Views/Themes'
import Theme from './Views/Theme'
import Search from './Views/Search'
import About from './Views/About'

const NotFound = () => (
  <section className="Page">
    <h1>Lost reel</h1>
    <p className="Muted">Nothing lives at this address.</p>
  </section>
)

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <a href="#main" className="SkipLink">
        Skip to content
      </a>
      <Header />
      <Trail />

      <main id="main" className="Main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/now" element={<Now />} />
          <Route path="/top" element={<ToBrowse sort="top" />} />
          <Route path="/trending" element={<ToBrowse sort="trending" />} />
          <Route path="/discover" element={<ToBrowse />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/person/:personId" element={<Person />} />
          <Route
            path="/actor/:personId"
            element={<Person />}
          />
          <Route path="/creators" element={<Creators />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/theme/:id" element={<Theme />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
