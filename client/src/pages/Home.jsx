import { useEffect, useState } from 'react'
import GameCard from '../components/GameCard'
import { Link } from 'react-router-dom'

// Route "/"
export default function Home() {

  const [games, setGames] = useState([{}])
  const [search, setSearch] = useState("")
  const [offset, setOffset] = useState(0) // default offset
  const [limit, setLimit] = useState(100) // default number per page
  
  useEffect(() => {
    fetch(`/api/games/`)
      .then(response => response.json())
      .then(data => {setGames(data)})
    }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitted')
    fetch(`/api/games/${search}`)
      .then(response => response.json())
      .then(data => {setGames(data)})
  }

  return (
    <>
      <h1>Games</h1>

      <form onSubmit={handleSubmit}>
        <input 
          placeholder='Search for Games'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {games.length > 0? (
        games.map(game => { 
          // let name = String(game.name).toLowerCase()
          // let regexp = new RegExp(search.toLowerCase())
          // if (regexp.test(name)) {
            return (
              <Link to={`game/${game.id}`}>
                <GameCard {...game}/>
              </Link>  
            )
          } 
        // }
        )
      ) : (
        <p>No games found</p>
      )}


    </>
  )
}