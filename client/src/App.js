import React, { useEffect, useState } from 'react'

function App() {

  const [games, setGames] = useState([{}])

  useEffect(() => {
    fetch("/api/games/")
      .then(response => response.json())
      .then(data => {setGames(data)})
    }, [])

  const image_url = 'https://images.igdb.com/igdb/image/upload/t_cover_small/'

  return (
    <>
      <h1>Games</h1>

      {games.length > 0? (
        games.map(game => 
          <div key={game.id}>
            <h3>{game.name}</h3>
            {game.cover !== undefined? (
              <img src={`${image_url + game.cover.image_id}.jpg`} alt={game.name}/>
            ) : (
              <img href='../public/blank.png' alt='blank img' />
            )}
            <p>{parseFloat(game.rating).toFixed(2)} | {game.rating_count}</p>
          </div>
        )
      ) : (
        <p>Loading</p>
      )}

    </>
  )
}

export default App