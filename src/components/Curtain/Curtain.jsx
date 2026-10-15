import React, { useEffect, useState } from 'react'
import { firstResponse, requestsStarted } from '../../api'
import './Curtain.css'

const MIN_MS = 800
const MAX_MS = 8000
const REMOVE_MS = 2000

const Curtain = () => {
  const [phase, setPhase] = useState('loading')

  useEffect(() => {
    let active = true
    let ready = requestsStarted() === 0
    let minDone = false

    const tryLift = () => {
      if (active && ready && minDone) setPhase('lifting')
    }
    const markReady = () => {
      ready = true
      tryLift()
    }

    const minTimer = setTimeout(() => {
      minDone = true
      tryLift()
    }, MIN_MS)
    const safetyTimer = setTimeout(markReady, MAX_MS)
    firstResponse.then(markReady)

    return () => {
      active = false
      clearTimeout(minTimer)
      clearTimeout(safetyTimer)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'lifting') return
    const removeTimer = setTimeout(() => setPhase('done'), REMOVE_MS)
    return () => clearTimeout(removeTimer)
  }, [phase])

  if (phase === 'done') return null

  const onTransitionEnd = (event) => {
    if (event.target === event.currentTarget && phase === 'lifting') {
      setPhase('done')
    }
  }

  return (
    <div
      className={phase === 'lifting' ? 'Curtain is-lifting' : 'Curtain'}
      onTransitionEnd={onTransitionEnd}
    >
      <div className="Curtain-drape Curtain-drape--left" aria-hidden="true" />
      <div className="Curtain-drape Curtain-drape--right" aria-hidden="true" />
      <div className="Curtain-valance" aria-hidden="true" />
      <div className="Curtain-spot" aria-hidden="true" />
      <div className="Curtain-marquee" role="status">
        <div className="Curtain-logo">
          EMDB
          <span className="Curtain-dot" aria-hidden="true" />
        </div>
        <div className="Curtain-bar" aria-hidden="true">
          <div className="Curtain-fill" />
        </div>
        <p className="Curtain-text">
          loading assets and fetching movies for you...
        </p>
      </div>
    </div>
  )
}

export default Curtain
