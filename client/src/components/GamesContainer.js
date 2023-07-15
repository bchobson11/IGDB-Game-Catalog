import GameCard from '../components/GameCard'
import styles from './GamesContainer.module.css'

export default function GamesContainer({games}) {

  return (
    <div className={styles.container}>
      {games.length > 0? (
        games.map( (game, i) => 
          <GameCard key={game.id} {...game}/>
        )
      ) : (
          <p>No games found</p>
      )}
    </div>
  )
}