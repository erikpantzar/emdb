import React, { useEffect, useState } from 'react'
import Scale from '../components/Form/Scale/Scale'
import MovieList from '../components/MovieList/MovieList'
import api from '../api'

const Discover = () => {
	const [discover, setDiscover] = useState([])
	const [page, setPage] = useState(1)
	const [maxPage, setMaxPage] = useState(2)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		async function fetch() {
			setIsLoading(true)
			const genres = [28]
			const cast = [62]
			const vote = 1

			if (page < maxPage + 1) {
				const res = await api.discover({ genres, cast, vote, page })
				setDiscover([...discover, ...res.results])
				setMaxPage(res.total_pages)
				setIsLoading(false)
			}
		}

		if (!isLoading) {
			fetch()
		}
	}, [page])

	const trackScroll = (event) => {
		const element = document.querySelector('#one')
		const win = window.innerHeight
		const bottom = element.getBoundingClientRect().bottom

		if (bottom <= win) {
			if (page < maxPage + 1) {
				setPage(page + 1)
			}
		}
	}

	useEffect(() => {
		function handleListen() {
			document.addEventListener('scroll', trackScroll)
		}

		handleListen()

		return function cleanup() {
			document.removeEventListener('scroll', trackScroll)
		}
	}, [page])

	return (
		<div>
			<h1>Discover</h1>

			<Scale min={0} max={10} />

			{discover.length > -1 && (
				<div id="one">
					<MovieList movies={discover} />
				</div>
			)}

		</div>
	)
}

export default Discover
