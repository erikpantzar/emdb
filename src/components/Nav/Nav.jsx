import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () => (
  <nav className="Nav">
    <Link to="/now">Now</Link>
    <Link to="/top">Top</Link>
    <Link to="/trending">Trending</Link>
    <Link to="/discover">Discover</Link>
    <Link to="/creators">Creators</Link>
    <Link to="/actors">Actors</Link>
    <Link to="/themes">Themes</Link>
    <Link to="/about">About</Link>
  </nav>
)

export default Nav
