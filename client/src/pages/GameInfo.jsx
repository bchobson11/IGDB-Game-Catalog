import { useEffect, useState } from "react"
import GameCard from "../components/GameCard"
import { useNavigate, useParams } from "react-router-dom"
import styles from './GameInfo.module.css'
import LeftIcon from '@mui/icons-material/ArrowCircleLeftRounded';

// Route "/game/:id"
export default function GameInfo() {

  const [game, setGame] = useState({})
  const navigate = useNavigate();

  const { id } = useParams()

  useEffect(() => {
    fetch(`/api/game/${id}`)
      .then(response => response.json())
      .then(data => {setGame(data)})
    }, [id])

  const image_url = 'https://images.igdb.com/igdb/image/upload/t_720p/'
  const video_url = 'https://www.youtube.com/embed/' 

  const image = game.cover? `${image_url + game.cover.image_id}.jpg` : 'http://via.placeholder.com/90x128'

  return (
    <div className={styles.container}>

      <div className={styles.backCont} onClick={() => navigate(-1)}>
        <p className={styles.backText}>Back</p>
        <LeftIcon sx={{ fontSize: 50}}className={styles.backIcon}/>
      </div>


      <div className={styles.infoContainer}>
        <h1 className={styles.title}>{game.name}</h1>
        
        <img 
          className={styles.image}
          src={image} 
          alt={game.name}
        />     

        <div className={styles.stats}> 
          <p>Rating: {game.rating}</p> 
          <p>Genres: {game.genres && game.genres.map(genre => `${genre.name} ` ) }</p>
          <p>Themes: {game.themes && game.themes.map(theme => `${theme.name} ` ) }</p>
          <p>Game Engines: {game.game_engines && game.game_engines.map(engine => `${engine.name} ` ) }</p>
          <p>Involved Companies: {game.involved_companies && game.involved_companies.map(i => `${i.company.name} ` ) }</p>
        </div>   
        

        <div className={styles.info}>
          <p>{game.summary}</p>
          {game.storyline &&  <p>{game.storyline}</p>}     
        </div>
      </div>

      <div className={styles.artContainer}> 
        {game.screenshots && game.screenshots.map(art =>
          <img 
            key={art.id}
            src={`${image_url + art.image_id}.jpg`}
          />
        )}
        {game.videos && game.videos.map(vid => 
          <iframe
            src={`${video_url + vid.video_id}`} 
          >
          </iframe>
        )}
      </div>

      <div className={styles.similarGamesContainer}>
        {game.similar_games && game.similar_games.map(game =>
          <GameCard className={styles.gameCard} key={game.id} {...game}/>
        )}
      </div>


      <pre>{JSON.stringify(game, null, 2)}</pre>
    </div>
  )
}