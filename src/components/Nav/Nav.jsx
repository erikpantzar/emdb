import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () => (
  <nav className="Nav">
    <Link to="/">Trending</Link>
    <Link to="/discover">Discover</Link>
    <Link to="/about">About</Link>
  </nav>
)

export default Nav
