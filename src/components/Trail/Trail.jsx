import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTrail } from './useTrail'
import './Trail.css'

const Trail = () => {
  const steps = useTrail()
  const { pathname } = useLocation()

  if (steps.length === 0) return null

  return (
    <ol className="Trail">
      {steps.map((step) => (
        <li key={step.path} className="Trail-step">
          {step.path === pathname ? (
            <span className="Trail-current">{step.label}</span>
          ) : (
            <Link to={step.path}>{step.label}</Link>
          )}
        </li>
      ))}
    </ol>
  )
}

export default Trail
