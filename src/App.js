import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import Movie from "./Views/Movie"
import Home from "./Views/Home"
import Search from "./components/Search/Search"

export default function App() {
  return (
    <Router>
      <div>
        <header>
          <Search />
        </header>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <a href="https://www.themoviedb.org/">
                The MovieDB.org - Source of data
              </a>
            </li>

            <li>
              <a href="https://developers.themoviedb.org/3">API docs</a>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path={`/movie/:id`} component={Movie} />
        </Switch>
      </div>
    </Router>
  )
}
