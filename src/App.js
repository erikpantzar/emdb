import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import Movie from "./Views/Movie"
import Home from "./Views/Home"
import Discover from "./Views/Discover"
import Search from "./components/Search/Search"

export default function App() {
  const [searchVisible, setSearchVisible] = useState(false)


  return (
    <Router>
      <div>
        <header>
          {searchVisible && <Search toggleSearch={setSearchVisible} />}
          
        </header>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/discover">Discover</Link>
            </li>

            <li>
              <a href="https://www.themoviedb.org/">
                The MovieDB.org - Source of data
              </a>
            </li>

            <li>
              <a href="https://developers.themoviedb.org/3">API docs</a>
            </li>

            <li>
              <button onClick={() => setSearchVisible(!searchVisible) } type="button">Search</button>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/discover">
            <Discover />
          </Route>

          <Route exact path={`/movie/:id`} component={Movie} />
        </Switch>
      </div>
    </Router>
  )
}
