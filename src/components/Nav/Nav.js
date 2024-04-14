import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Nav.css'

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

export const ElementInView = () => {
  // State to store the navbar array and active state
  const [navBarArray, setNavBarArray] = useState([])
  const [activeNavItem, setActiveNavItem] = useState(null)

  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === '') {
      window.scrollTo(0, 0)
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView()
        }
      }, 0)
    }
  }, [pathname, hash, key]) // do this on route change

  // useEffect to populate the navbar array
  useEffect(() => {
    const containers = document.querySelectorAll('[id]')
    const tempNavBarArray = []

    containers.forEach((container) => {
      if (container.id !== 'root') {
        // Skip adding the element if id is "root"
        let label = ''
        const headingElement = container.querySelector('h1, h2, h3, h4, h5, h6')
        if (headingElement) {
          label = headingElement.textContent
        } else if (container.hasAttribute('datalabel')) {
          label = container.getAttribute('datalabel')
        }

        if (label.trim() !== '') {
          const hash = `#${container.id}`
          tempNavBarArray.push({ hash, label })
        }
      }
    })

    setNavBarArray(tempNavBarArray)
  }, [])

  // useEffect to trigger UI state change when element in navbar array comes into view
  useEffect(() => {
    const handleScroll = () => {
      navBarArray.forEach((navItem) => {
        const element = document.querySelector(navItem.hash)
        if (element) {
          const rect = element.getBoundingClientRect()
          const isVisible = rect.top < window.innerHeight && rect.bottom >= 0
          if (isVisible) {
            // Trigger your UI state change here
            setActiveNavItem(navItem.hash)
            // console.log(`Element with ID '${element.id}' is in view.`)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [navBarArray])

  return (
    <nav className="nav-bar-details">
      <div className="nav-bar-inner">
        {navBarArray.map((item) => (
          <div
            key={item.hash}
            className={
              activeNavItem === item.hash
                ? 'nav-item-active nav-item'
                : 'nav-item'
            }
          >
            <a href={item.hash}>{item.label}</a>
          </div>
        ))}
      </div>
    </nav>
  )
}
