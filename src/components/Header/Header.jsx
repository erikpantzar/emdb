import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { CloseIcon, MenuIcon, SearchIcon } from '../Icons/Icons'
import api from '../../api'
import { image, yearOf } from '../../lib/format'
import './Header.css'

const links = [
  ['/', 'Home'],
  ['/browse', 'Browse'],
  ['/creators', 'Creators'],
  ['/actors', 'Actors'],
  ['/themes', 'Themes'],
]

const linkOf = (item) =>
  item.media_type === 'movie' ? `/movie/${item.id}` : `/person/${item.id}`

const HeaderSearch = ({ initial }) => {
  const navigate = useNavigate()
  const [term, setTerm] = useState(initial)
  const [suggestions, setSuggestions] = useState([])
  const [active, setActive] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const value = term.trim()
    if (value.length < 2) {
      setSuggestions([])
      return
    }

    let current = true
    const timer = setTimeout(() => {
      api
        .suggest(value)
        .then((results) => {
          if (!current) return
          setSuggestions(results)
          setActive(-1)
        })
        .catch(() => current && setSuggestions([]))
    }, 300)

    return () => {
      current = false
      clearTimeout(timer)
    }
  }, [term])

  const showList = isOpen && suggestions.length > 0

  const pick = (item) => {
    setIsOpen(false)
    navigate(linkOf(item))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const value = term.trim()
    setIsOpen(false)
    if (value) navigate(`/search?q=${encodeURIComponent(value)}`)
  }

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    } else if (event.key === 'ArrowDown' && suggestions.length) {
      event.preventDefault()
      setIsOpen(true)
      setActive((active + 1) % suggestions.length)
    } else if (event.key === 'ArrowUp' && suggestions.length) {
      event.preventDefault()
      setIsOpen(true)
      setActive(active <= 0 ? suggestions.length - 1 : active - 1)
    } else if (event.key === 'Enter' && showList && active >= 0) {
      event.preventDefault()
      pick(suggestions[active])
    }
  }

  return (
    <form role="search" className="Header-search" onSubmit={onSubmit}>
      <label htmlFor="site-search" className="visually-hidden">
        Search movies and people
      </label>
      <SearchIcon />
      <input
        id="site-search"
        name="q"
        type="search"
        value={term}
        placeholder="Search movies, people"
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showList}
        aria-controls="site-suggest"
        aria-activedescendant={
          showList && active >= 0 ? `suggest-${active}` : undefined
        }
        onChange={(event) => {
          setTerm(event.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onKeyDown={onKeyDown}
      />
      {showList && (
        <ul className="Header-suggest" id="site-suggest" role="listbox">
          {suggestions.map((item, index) => {
            const isMovie = item.media_type === 'movie'
            const src = image(
              isMovie ? item.poster_path : item.profile_path,
              'w92'
            )
            return (
              <li
                key={`${item.media_type}-${item.id}`}
                id={`suggest-${index}`}
                role="option"
                aria-selected={index === active}
                className="Header-suggestion"
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActive(index)}
                onClick={() => pick(item)}
              >
                {src ? (
                  <img src={src} alt="" loading="lazy" />
                ) : (
                  <span
                    className="Header-suggestion-blank"
                    aria-hidden="true"
                  />
                )}
                <span className="Header-suggestion-text">
                  <span className="Header-suggestion-title">
                    {isMovie ? item.title : item.name}
                  </span>
                  <span className="Header-suggestion-meta">
                    {isMovie
                      ? yearOf(item.release_date) || 'Movie'
                      : item.known_for_department || 'Person'}
                  </span>
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </form>
  )
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const query =
    location.pathname === '/search'
      ? new URLSearchParams(location.search).get('q') || ''
      : ''

  useEffect(() => setIsOpen(false), [location.pathname, location.search])

  return (
    <header className={isOpen ? 'Header is-open' : 'Header'}>
      <Link to="/" className="Header-logo">
        EMDB
        <span className="Header-dot" aria-hidden="true" />
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

        <HeaderSearch key={query} initial={query} />
      </div>
    </header>
  )
}

export default Header
