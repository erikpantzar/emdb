import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTrail } from './useTrail'
import './Trail.css'

const Trail = () => {
  const steps = useTrail()
  const { pathname } = useLocation()

  if (steps.length === 0) return null

  return (
    <nav className="Trail" aria-label="Your trail">
      <span className="Trail-label" aria-hidden="true">
        Trail
      </span>
      <ol className="Trail-list">
        {steps.map((step) => (
          <li key={step.path} className="Trail-step">
            {step.path === pathname ? (
              <span className="Trail-current" aria-current="page">
                {step.label}
              </span>
            ) : (
              <Link to={step.path} className="Trail-link">
                {step.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Trail
