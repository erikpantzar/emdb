const IMG = 'https://image.tmdb.org/t/p'

const image = (path, size = 'w342') => (path ? `${IMG}/${size}${path}` : null)

const yearOf = (date) => (date ? date.slice(0, 4) : '')

const MIN_VOTES = 20

const ratingOf = (movie) =>
  movie.vote_count >= MIN_VOTES && movie.vote_average
    ? movie.vote_average.toFixed(1)
    : null

const runtimeOf = (minutes) => {
  if (!minutes) return ''
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h ? `${h}h ${m}m` : `${m}m`
}

const byNewest = (a, b) =>
  (b.release_date || '').localeCompare(a.release_date || '')

const byRating = (a, b) =>
  (ratingOf(b) || 0) - (ratingOf(a) || 0) || b.vote_count - a.vote_count

export { image, yearOf, ratingOf, runtimeOf, byNewest, byRating }
