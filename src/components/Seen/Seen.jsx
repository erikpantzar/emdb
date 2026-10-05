import React from 'react'
import { useSeen } from '../../hooks/useSeen'
import { CheckIcon, EyeIcon } from '../Icons/Icons'

const SeenToggle = ({ movie, className = 'SeenToggle', withLabel = false }) => {
  const { seen, toggleSeen } = useSeen()
  const isSeen = seen.has(movie.id)

  return (
    <button
      type="button"
      className={className}
      aria-pressed={isSeen}
      aria-label={withLabel ? undefined : `Seen ${movie.title}`}
      title={isSeen ? 'Seen, click to unmark' : 'Mark as seen'}
      onClick={() => toggleSeen(movie.id)}
    >
      {isSeen ? <CheckIcon /> : <EyeIcon />}
      {withLabel && <span>Seen</span>}
    </button>
  )
}

const HideSeenSwitch = () => {
  const { hideSeen, toggleHideSeen } = useSeen()

  return (
    <button
      type="button"
      role="switch"
      aria-checked={hideSeen}
      className="Switch"
      onClick={toggleHideSeen}
    >
      <span className="Switch-track" />
      Hide seen
    </button>
  )
}

export { SeenToggle, HideSeenSwitch }
