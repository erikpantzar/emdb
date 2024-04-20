import React from 'react'
import { Link } from 'react-router-dom'
import Search from '../Search/Search'
import './AppHeader.css'

const AppHeader = () => {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="app-first">
          <Link className="app-logo" to="/">
            EMDB
          </Link>

          <div className="app-header-search">
            <Search />
          </div>
        </div>

        <a href="https://github.com/erikpantzar/emdb">Source</a>
      </div>
    </header>
  )
}

export default AppHeader
