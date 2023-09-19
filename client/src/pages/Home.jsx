import { useEffect, useState } from 'react'
import GamesContainer from '../components/GamesContainer'
import styles from './Home.module.css'
import RightIcon from '@mui/icons-material/ArrowCircleRightRounded';
import LeftIcon from '@mui/icons-material/ArrowCircleLeftRounded';


// Route "/"
export default function Home() {

  const [games, setGames] = useState([])
  const [search, setSearch] = useState("")
  const [offset, setOffset] = useState(0) // default offset
  const [limit] = useState(40) // default number per page
  
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchGames()
    setOffset(0)
  }
 
  const handleNextPage = () => {
    if (games.length === limit) {
      setOffset(prevOffset => prevOffset + limit);
    } else return;
  };
  
  const handlePreviousPage = () => {
    if (offset !== 0) {
      setOffset(prevOffset => prevOffset - limit);
    } else return;
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
    const scroller = document.querySelector("#body");
    scroller.scrollTo({top: 0, behavior: 'instant'})
    // eslint-disable-next-line
  }, [offset, limit])

  return (
    <div className={styles.container}>

      <div className={styles.top}>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input 
            className={styles.input}
            placeholder='Search for Games'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

        <div className={`${styles.prevCont} ${offset === 0 && styles.disabled}`} onClick={handlePreviousPage}>
            <p className={styles.prevText}>Prev</p>
            <LeftIcon sx={{ fontSize: 50}} className={styles.prevIcon}/>
        </div>

        <div className={`${styles.nextCont} ${games.length < limit && styles.disabled}`} onClick={handleNextPage}>
          <RightIcon sx={{ fontSize: 50 }} className={styles.nextIcon}/>
          <p className={styles.nextText}>Next</p>
        </div>

        <GamesContainer games={games}/>

    </div>
  )
}