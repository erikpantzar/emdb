import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

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
    <Router>
      <ScrollToTop>
        {searchVisible && <Search toggleSearch={setSearchVisible} />}

        <Nav />

        <button onClick={() => setSearchVisible(!searchVisible)} type="button">
          Search
        </button>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/discover">
            <Discover />
          </Route>

          <Route exact path="/about" component={About} />

          <Route exact path={`/movie/:id`} component={Movie} />
          <Route exact path={`/actor/:personId`} component={Actor} />
        </Switch>
      </ScrollToTop>
    </Router>
  )
}
