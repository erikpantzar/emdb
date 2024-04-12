import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Trending from './components/Trending/Trending'
import Movie from './components/MediaDetail/MediaDetail'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Trending></Trending>
        </Route>

        <Route exact path={`/:media/:id`} component={Movie} />
      </Switch>
    </Router>
  )
}
