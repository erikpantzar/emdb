import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { GenreProvider } from './components/Genres/genresContext'
import { TrendingProvider } from './components/Trending/TrendingContext'
import Trending from './components/Trending/Trending'
import Detail from './components/MediaDetail/MediaDetail'

export default function App() {
  return (
    <Router>
      <GenreProvider>
        <Switch>
          <Route exact path="/">
            <TrendingProvider>
              <Trending />
            </TrendingProvider>
          </Route>

          <Route exact path={`/:media/:id`} component={Detail} />
        </Switch>
      </GenreProvider>
    </Router>
  )
}
