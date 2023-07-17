import { Link } from 'react-router-dom'
import styles  from './GameCard.module.css'

export default function GameCard(game) {

  const image_url = 'https://images.igdb.com/igdb/image/upload/t_720p/' 

  const image = game.cover !== undefined? `${image_url + game.cover.image_id}.jpg` : 'http://via.placeholder.com/90x128'
  // const rating = game.rating !== undefined && game.rating.toFixed(2)


  return (
    <Link style={{textDecoration: 'none'}} to={`/game/${game.id}`}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img 
            className={styles.image}
            src={image} 
            alt={game.name}
          />
        </div>
        <div className={styles.infoContainer}>
          <h3 className={styles.gameName}>{game.name}</h3>
        </div>
      </div>
    </Link>
  )
}