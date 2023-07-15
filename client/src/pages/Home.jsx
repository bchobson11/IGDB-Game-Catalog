import { useEffect, useState } from 'react'
import GamesContainer from '../components/GamesContainer'
import PaginationButtons from '../components/PaginationButtons'
import styles from './Home.module.css'

// Route "/"
export default function Home() {

  const [games, setGames] = useState([])
  const [search, setSearch] = useState("")
  const [offset, setOffset] = useState(0) // default offset
  const [limit] = useState(100) // default number per page
  
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

  const fetchGames = () => {
    fetch(`/api/games/${offset}/${limit}?search=${search}`)
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }

  useEffect(() => {
    fetchGames()
    // eslint-disable-next-line
  }, [offset, limit])

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Games</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input 
          className={styles.input}
          placeholder='Search for Games'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <PaginationButtons
          handlePrev={handlePreviousPage}
          handleNext = {handleNextPage}
          offset = {offset}
          limit = {limit}
          gamesLength = {games.Length}
        />
      
      <GamesContainer games={games}/>

        <PaginationButtons
          handlePrev={handlePreviousPage}
          handleNext = {handleNextPage}
          offset = {offset}
          limit = {limit}
          gamesLength = {games.Length}
        />


    </div>
  )
}