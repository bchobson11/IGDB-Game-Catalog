import React, { useEffect, useState } from 'react'

function App() {

  const [games, setGames] = useState([{}])

  useEffect(() => {
    fetch("/api/games")
      .then(response => response.json())
      .then(data => {setGames(data)})
    }, [])

    

    // {
    //   "id": 1,
    //   "cover": {
    //     "id": 291911,
    //     "image_id": "co698n"
    //   },
    //   "genres": [
    //     "Shooter",
    //     "Simulator",
    //     "Adventure"
    //   ],
    //   "name": "Thief II: The Metal Age",
    //   "rating": 86.68295195538036,
    //   "rating_count": 118
    // }

  return (
    <>
      <h1>Games</h1>

      {games.length > 0? (
        games.map(game => {
          console.log(game)
          return (
            <div key={game.id}>
              {game.cover !== undefined? (
                <img src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${game.cover.image_id}.jpg`} alt={game.name}/>
              ) : (
                <img src='../public/blank.jpg' alt='blank img' />
              )}
              <h3>{game.name}</h3>
              <p>{parseFloat(game.rating).toFixed(2)} | {game.rating_count}</p>
            </div>
          )
        })
      ) : (
        <p>Loading</p>
      )}

    </>
  )
}

export default App