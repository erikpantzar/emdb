import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { CloseIcon, MenuIcon, SearchIcon } from '../Icons/Icons'
import './Header.css'

const links = [
  ['/', 'Home'],
  ['/browse', 'Browse'],
  ['/creators', 'Creators'],
  ['/actors', 'Actors'],
  ['/themes', 'Themes'],
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const query =
    location.pathname === '/search'
      ? new URLSearchParams(location.search).get('q') || ''
      : ''

  useEffect(() => setIsOpen(false), [location.pathname, location.search])

  const onSearch = (event) => {
    event.preventDefault()
    const value = new FormData(event.target).get('q').trim()
    if (value) navigate(`/search?q=${encodeURIComponent(value)}`)
  }

  return (
    <header className={isOpen ? 'Header is-open' : 'Header'}>
      <Link to="/" className="Header-logo">
        EMDB<span className="Header-dot" aria-hidden="true" />
        <span className="visually-hidden"> home</span>
      </Link>

      <button
        type="button"
        className="Header-menu"
        aria-expanded={isOpen}
        aria-controls="site-nav"
        aria-label="Menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div className="Header-panel" id="site-nav">
        <nav aria-label="Main">
          <ul className="Header-links">
            {links.map(([to, label]) => (
              <li key={to}>
                <NavLink to={to} end={to === '/'} className="Header-link">
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <form
          role="search"
          className="Header-search"
          onSubmit={onSearch}
          key={query}
        >
          <label htmlFor="site-search" className="visually-hidden">
            Search movies and people
          </label>
          <SearchIcon />
          <input
            id="site-search"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search movies, people"
            autoComplete="off"
          />
        </form>
      </div>
    </header>
  )
}

export default Header
