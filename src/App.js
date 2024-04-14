import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { GenreProvider } from './components/Genres/genresContext'
import { TrendingProvider } from './components/Trending/TrendingContext'
import { MediaProvider } from './components/MediaDetail/MediaContext'

import Trending from './components/Trending/Trending'
import Detail from './components/MediaDetail/MediaDetail'
import Person from './components/Person/Person'
import Discover from './components/Discover/Discover'

export default function App() {
  return (
    <Router>
      <GenreProvider>
        <MediaProvider>
          <Switch>
            <Route exact path="/">
              <TrendingProvider>
                <Trending />
              </TrendingProvider>
            </Route>

            <Route exact path={`/person/:id`} component={Person}></Route>
            <Route path={`/m/:media/:id`} component={Detail} />
            <Route path={`/d/:media/:id/:tag`} component={Discover} />
          </Switch>
        </MediaProvider>
      </GenreProvider>
    </Router>
  )
}
