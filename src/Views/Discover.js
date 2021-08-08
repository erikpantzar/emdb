import React, { useEffect, useState } from 'react'
import Scale from '../components/Form/Scale/Scale'
import MovieList from '../components/MovieList/MovieList'
import api from '../api'

const Discover = () => { 
	const [discover, setDiscover] = useState([])


	useEffect(() => {
    async function fetch() {
    	const genres = [28]
			const cast = [62]
			const vote = 2

			const res = await api.discover({ genres, cast, vote })
			setDiscover(res)			
    }

    fetch()
  }, [])


	return (
		<div>
			<h1>Discover</h1>

			<Scale min={0} max={10} />

			{discover.length > -1 && <MovieList movies={discover} />}
		</div>
	)
}

export default Discover