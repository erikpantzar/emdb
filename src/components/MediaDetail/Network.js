import React from 'react'

import './Network.css'

const profile = (url) => `https://image.tmdb.org/t/p/w200${url}`

const Network = ({ network }) => (
  <div className="network-container">
    <img
      className="network-image"
      src={profile(network.logo_path)}
      alt={network.name}
    />
  </div>
)

export default Network
