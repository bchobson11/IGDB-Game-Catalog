import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import GameCard from "../components/GameCard"
import Websites from "../components/Websites"
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
          <table className={styles.table}>
            <tr>
              <th>Genres</th>
              {game.genres && game.genres.map(genre => 
                <td>{`${genre.name} `}</td>
              )}
            </tr>
            <tr>
              <th>Themes</th>
              {game.themes && game.themes.map(theme => 
                <td>{`${theme.name} `}</td>
              )}
            </tr>
            <tr>
              <th>Game Engines</th>
              {game.game_engines && game.game_engines.map(engine => 
                <td>{`${engine.name} `}</td>
              )}
            </tr>
            <tr>
              <th>Companies</th>
              {game.involved_companies && game.involved_companies.map(i => 
                <td>{`${i.company.name} `}</td>
              )}
            </tr>
            <tr>
              <th>Platforms</th>
              {game.platforms && game.platforms.map(platform => 
                <td>{`${platform.name} `}</td>
              )}
            </tr>
            <tr>
              <th>Game Modes</th>
              {game.game_modes && game.game_modes.map(mode => 
                <td>{`${mode.name} `}</td>
              )}
            </tr>
            <tr>
              <th>Player Perspectives</th>
              {game.player_perspectives && game.player_perspectives.map(perspective => 
                <td>{`${perspective.name} `}</td>
              )}
            </tr>
          </table>

        </div>   
          <Websites webs = {game.websites} />
      </div>
        

      <h2>Summary</h2>

      <p>{game.summary}</p>
        
      <h2>Media</h2>

      <div className={styles.artContainer}> 
        {game.screenshots && game.screenshots.map(art =>
          <img 
          key={art.id}
          src={`${image_url + art.image_id}.jpg`}
          alt='gameplay'
          />
          )}
        {game.videos && game.videos.map(vid => 
          <iframe
          title={vid.name}
          src={`${video_url + vid.video_id}`} 
          >
          </iframe>
        )}
      </div>

      {game.storyline &&  ( 
        <>
          <h2>Storyline</h2>
          <p>{game.storyline}</p>
        </>
      )}     

      <h2>Similar Games</h2>

      <div className={styles.similarGamesContainer}>
        {game.similar_games && game.similar_games.map(game =>
          <GameCard key={game.id} {...game}/>
        )}
      </div>


      {/* <pre>{JSON.stringify(game, null, 2)}</pre> */}
    </div>
  )
}