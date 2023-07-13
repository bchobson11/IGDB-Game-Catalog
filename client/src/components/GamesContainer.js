import GameCard from '../components/GameCard'

export default function GamesContainer({games}) {

  return (
    <div>
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