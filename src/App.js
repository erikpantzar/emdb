import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Movie from './Views/Movie'
import Home from './Views/Home'
import Discover from './Views/Discover'
import About from './Views/About'
import Search from './components/Search/Search'

export default function App() {
  const [searchVisible, setSearchVisible] = useState(false)

  return (
    <Router>
      <div>
        {searchVisible && <Search toggleSearch={setSearchVisible} />}

        <nav>
          <ul>
            <li>
              <Link to="/">Trending</Link>
            </li>

            <li>
              <Link to="/discover">Discover</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

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
        </Switch>
      </div>
    </Router>
  )
}
