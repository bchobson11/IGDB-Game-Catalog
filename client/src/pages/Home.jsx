import { useEffect, useState } from 'react'
import GameCard from '../components/GameCard'
import { Link } from 'react-router-dom'

// Route "/"
export default function Home() {

  const [games, setGames] = useState([{}])
  const [search, setSearch] = useState("")
  const [offset, setOffset] = useState(0) // default offset
  const [limit, setLimit] = useState(10) // default number per page
  
  

  const fetchGames = () => {
    fetch(`/api/games/${offset}/${limit}?search=${search}`)
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
      
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchGames()
    setOffset(0)
  }

  const handleNextPage = () => {
    setOffset(prevOffset => prevOffset + limit);
  };

  const handlePreviousPage = () => {
    setOffset(prevOffset => prevOffset - limit);
  };

  useEffect(() => {
    fetchGames()
  }, [offset, limit])

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

      <button onClick={handlePreviousPage} disabled={offset === 0}>
        Previous Page
      </button>
      <button onClick={handleNextPage} disabled={games.length === 0}>Next Page</button>
      
      {games.length > 0? (
        games.map(game =>  
          <Link to={`game/${game.id}`}>
            <GameCard {...game}/>
          </Link>  
        )
        ) : (
          <p>No games found</p>
          )}

        <button onClick={handlePreviousPage} disabled={offset === 0}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={games.length === 0}>Next Page</button>


    </>
  )
}