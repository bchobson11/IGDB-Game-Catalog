import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import GameCard from "../components/GameCard"
import Websites from "../components/Websites"
import styles from './GameInfo.module.css'
import LeftIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css'

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

      <h2 className={styles.sections}>Summary</h2>

      <p className={styles.text}>{game.summary}</p>
        
      {game.screenshots && (
        <>
          <h2 className={styles.sections}>Images</h2>

          <AwesomeSlider className={styles.slider} >
            {game.screenshots.map(art =>
              <div>
                <img 
                  className={styles.sliderImg}
                  key={art.id}
                  src={`${image_url + art.image_id}.jpg`}
                  alt='gameplay'
                />
              </div>
            )}
          </AwesomeSlider>
        </>
      )}



      
      {game.storyline &&  ( 
        <>
          <h2 className={styles.sections}>Storyline</h2>
          <p className={styles.text}>{game.storyline}</p>
        </>
      )}     

      {game.videos && (
        <>
        <h2 className={styles.sections}>Videos</h2>

          <AwesomeSlider className={styles.slider} infinite={false} >
            {game.videos.map(vid =>
              <div>
                <iframe 
                  className={styles.frame}
                  title={vid.name}
                  src={`${video_url + vid.video_id}?rel=0`} 
                  allow="fullscreen"
                >
                </iframe>
              </div>
            )}
          </AwesomeSlider>
        </>
      )}

      <h2 className={styles.sections}>Similar Games</h2>

      <div className={styles.similarGamesContainer}>
        {game.similar_games && game.similar_games.map(game =>
          <GameCard key={game.id} {...game}/>
        )}
      </div>

      {/* <pre>{JSON.stringify(game, null, 2)}</pre> */}
    </div>
  )
}