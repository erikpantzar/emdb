import React from "react"
import MovieContainer from "../components/Movie/MovieContainer"

const Home = ({ match }) => {
  return (
    <div>
      <MovieContainer id={match.params.id} />
    </div>
  )
}

export default Home
