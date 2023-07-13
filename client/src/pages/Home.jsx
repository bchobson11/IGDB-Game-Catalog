import { useEffect, useState } from 'react'
import GameCard from '../components/GameCard'
import { Link } from 'react-router-dom'

// Route "/"
export default function Home() {

  const [games, setGames] = useState([{}])
  const [search, setSearch] = useState("")
  const [offset, setOffset] = useState(0) // default offset
  const [limit, setLimit] = useState(100) // default number per page
  
  

  const fetchGames = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {setGames(data)})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitted')
    fetchGames(`/api/games/${search}`)
  }

  const handleNextPage = () => {
    setOffset(prevOffset => prevOffset + limit);
  };

  const handlePreviousPage = () => {
    setOffset(prevOffset => prevOffset - limit);
  };

  useEffect(() => {
    fetchGames(`/api/games/${offset}/${limit}`)
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
      <button onClick={handleNextPage}>Next Page</button>
      
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
        <button onClick={handleNextPage}>Next Page</button>


    </>
  )
}