import React, { useEffect, useState } from 'react'

function App() {

  const [gameData, setGameData] = useState([{}])
  const [coverData, setCoverData] = useState([{}])

  useEffect(() => {
    fetch("/api/games")
      .then(response => response.json())
      .then(data => {setGameData(data)})
    }, [])

  useEffect(() => {
    fetch("/api/covers")
      .then(response => response.json())
      .then(data => {setCoverData(data)})
    }, [])

  return (

    <pre>
      <h2>Games</h2>
      {JSON.stringify(gameData, null, 2)}
      <h2>Covers</h2>
      {JSON.stringify(coverData, null, 2)}
    </pre>
  )
}

export default App