import React, { useEffect, useState, useRef } from 'react'
import Scale from '../components/Form/Scale/Scale'
import MovieList from '../components/MovieList/MovieList'
import api from '../api'

function useOnScreen(ref) {
	const [isIntersecting, setIntersecting] = useState(false)

	const observer = new IntersectionObserver(([entry]) =>
		setIntersecting(entry.isIntersecting)
	)

	useEffect(() => {
		observer.observe(ref.current)
		// Remove the observer as soon as the component is unmounted
		return () => {
			observer.disconnect()
		}
	}, [])

	return isIntersecting
}

const Discover = () => {
	const [discover, setDiscover] = useState([])
	const [page, setPage] = useState(1)
	const [maxPage, setMaxPage] = useState(2)
	const [isLoading, setIsLoading] = useState(false)

	const ref = useRef()
	const isVisible = useOnScreen(ref)

	useEffect(() => {
		async function fetch() {
			setIsLoading(true)
			const genres = [28]
			const cast = [62]
			const vote = 1

			if (page < maxPage + 1) {
				const res = await api.discover({ genres, cast, vote, page })
				setDiscover((discover) => [...discover, ...res.results])
				setMaxPage(res.total_pages)
				setIsLoading(false)
			}
		}

		if (!isLoading) {
			fetch()
		}
	})

	return (
		<div>
			<h1>Discover</h1>

			<Scale min={0} max={10} />

			{discover.length > -1 && (
				<div id="one">
					<MovieList movies={discover} />
					<div ref={ref}>{isVisible && 'yep'}</div>
				</div>
			)}
		</div>
	)
}

export default Discover
