import React from 'react'

const Svg = ({ children, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    {children}
  </svg>
)

const ChevronIcon = ({ direction = 'right' }) => (
  <Svg>
    <path d={direction === 'left' ? 'm15 5-7 7 7 7' : 'm9 5 7 7-7 7'} />
  </Svg>
)

const MenuIcon = () => (
  <Svg>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
)

const CloseIcon = () => (
  <Svg>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
)

const SearchIcon = () => (
  <Svg>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </Svg>
)

const PlayIcon = () => (
  <Svg fill="currentColor" stroke="none">
    <path d="M8 5.5v13l10.5-6.5L8 5.5Z" />
  </Svg>
)

export { ChevronIcon, MenuIcon, CloseIcon, SearchIcon, PlayIcon }
