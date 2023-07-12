export default function GameCard(game) {

  const image_url = 'https://images.igdb.com/igdb/image/upload/t_cover_small/'

  return (
    <div key={game.id}>
      <h3>{game.name}</h3>
      <img 
        src={game.cover !== undefined? `${image_url + game.cover.image_id}.jpg` : 'http://via.placeholder.com/90x128'} 
        alt={game.name}
      />
      <p>{parseFloat(game.rating).toFixed(2)} | {game.rating_count}</p>
    </div>
  )
}