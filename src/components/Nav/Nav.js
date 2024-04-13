import React, { useEffect } from 'react'
import './Nav.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export const BaseNav = ({ match }) => {
  console.log({ match })

  useEffect(() => {
    console.log('rendedred')
  }, [match])

  return (
    <nav className="nav-base">
      <Link className="nav-element" to="/">
        Trending
      </Link>

      <Link className="nav-element" to="/">
        Search
      </Link>

      <Link className="nav-element" to="/">
        About
      </Link>
    </nav>
  )
}
