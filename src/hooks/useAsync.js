import { useEffect, useState } from 'react'

export default function useAsync(load, deps) {
  const [state, setState] = useState({})

  useEffect(() => {
    let active = true
    setState({})

    load()
      .then((data) => active && setState({ data }))
      .catch((err) => active && setState({ error: err.message }))

    return () => {
      active = false
    }
  }, deps)

  return state
}
