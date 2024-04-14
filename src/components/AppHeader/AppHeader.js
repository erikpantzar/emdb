import React from 'react'
import { Link } from 'react-router-dom'
import './AppHeader.css'

const AppHeader = () => {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <Link to="/">EMDB</Link>

        <a href="https://github.com/erikpantzar/emdb">source</a>
      </div>
    </header>
  )
}

export default AppHeader
