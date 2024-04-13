import React, { useState, useEffect } from 'react'
import MediaCard from '../MediaCard/MediaCard'
import './Person.css'

const API_KEY = process.env.REACT_APP_API_KEY

const Person = ({ match }) => {
  const person_id = match.params.id

  const [person, setPerson] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const url = `https://api.themoviedb.org/3/person/${person_id}?api_key=${API_KEY}&append_to_response=images,combined_credits,external_ids`

      try {
        const res = await fetch(url)
        const json = await res.json()
        setPerson(json)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <article className="person-article">
      <figure
        className="person-profile-pic"
        style={{
          backgroundColor: 'black',
          maxHeight: '70vh',
          overflow: 'hidden',
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
          style={{ maxHeight: '70vh', width: 'auto' }}
          alt={person.name}
        />
      </figure>

      <main className="person-main">
        <div className="person-main-inner">
          <h1 className="person-title">{person.name}</h1>

          <div className="person-container">
            <div className="person-bio">
              <p>{person.biography}</p>
            </div>

            <aside>
              <h4>
                Also known as:{' '}
                {person.also_known_as.map((title, i) => (
                  <span key={i}>
                    {i !== 0 && person.also_known_as.length > 0 && ','}
                    {title}
                  </span>
                ))}
              </h4>

              <div>
                <h4>Born:</h4>
                <p>{person.birthday}</p>

                <h4>Place of birth: </h4>
                <p>{person.place_of_birth}</p>
              </div>

              {person.external_ids && (
                <div className="person-links">
                  <h4>Socials</h4>
                  {person.external_ids['twitter_id'] && (
                    <p>
                      <a
                        href={`https://twitter.com/${person.external_ids['twitter_id']}`}
                      >
                        @{person.external_ids['twitter_id']}
                      </a>{' '}
                      on twitter
                    </p>
                  )}

                  {person.external_ids['imdb_id'] && (
                    <p>
                      Read more about{' '}
                      <a
                        href={`https://www.imdb.com/name/${person.external_ids['imdb_id']}`}
                      >
                        {person.name}
                      </a>{' '}
                      profile on Imdb
                    </p>
                  )}
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>

      {person.combined_credits && (
        <section className="person-credits">
          <h2>Credits</h2>

          <div className="credits-container card-list">
            {person.combined_credits.cast
              .sort((a, b) => b.vote_average - a.vote_average)
              .filter((voted) => voted.vote_count > 10)
              .map((credited) => (
                <MediaCard
                  key={credited.id}
                  item={credited}
                  mediaType={credited.media_type}
                />
              ))}
          </div>
        </section>
      )}

      {person.images && (
        <div className="person-gallery-container" style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex' }}>
            {person.images.profiles.map((image, idx) => (
              <div
                key={idx}
                style={{
                  marginRight: '10px',
                  height: '100%',
                  maxWidth: '37vw',
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  alt={person.name}
                  style={{ height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

export default Person