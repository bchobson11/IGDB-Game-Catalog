import { useEffect, useState } from 'react'
import GameCard from '../components/GameCard'
import { Link } from 'react-router-dom'

// Route "/"
export default function Home() {

  const [games, setGames] = useState([{}])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/games/")
      .then(response => response.json())
      .then(data => {setGames(data)})
    }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <h1>Games</h1>

      <input 
        placeholder='Search for Games'
        value={search}
        onChange={handleChange}
      />

      {games.length > 0? (
        games.map(game => { 
          let name = String(game.name).toLowerCase()
          let regexp = new RegExp(search.toLowerCase())
          if (regexp.test(name)) {
            return (
              <Link to={`game/${game.id}`}>
                <GameCard {...game}/>
              </Link>  
            )
          } 
        })
      ) : (
        <p>No games found</p>
      )}

    </>
  )
}