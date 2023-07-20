import { useEffect, useState } from 'react'
import GamesContainer from '../components/GamesContainer'
import Modal from '../components/Modal'
import styles from './Home.module.css'
import RightIcon from '@mui/icons-material/ArrowCircleRightRounded';
import LeftIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import FilterIcon from '@mui/icons-material/AddCircleOutlined';
import SettingsIcon from '@mui/icons-material/SettingsSuggestRounded';


// Route "/"
export default function Home() {

  const [games, setGames] = useState([])
  const [search, setSearch] = useState("")
  const [offset, setOffset] = useState(0) // default offset
  const [limit] = useState(40) // default number per page
  const [showModal, setShowModal] = useState(false)
  
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

  function handleShowModal() {
    setShowModal(prev => !prev)
  }

  useEffect(() => {
    fetchGames()
    // eslint-disable-next-line
  }, [offset, limit])

  return (
    <div className={styles.container}>
      <Modal onClose={handleShowModal} show={showModal}/>

      <div className={styles.top}>

        <div className={styles.filterCont} onClick={e => handleShowModal()}>
            <p className={styles.filterText}>Filter</p>
            <FilterIcon sx={{ fontSize: 50}}className={styles.filterIcon}/>
        </div>

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