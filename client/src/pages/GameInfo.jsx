import { useEffect, useState } from "react"
import GameCard from "../components/GameCard"
import { useNavigate, useParams } from "react-router-dom"

// Route "/game/:id"
export default function GameInfo() {

  const [game, setGame] = useState({})
  const navigate = useNavigate();

  const { id } = useParams()

  useEffect(() => {
    fetch(`/api/game/${id}`)
      .then(response => response.json())
      .then(data => {setGame(data)})
    }, [])

  return (
    <div>
      <GameCard {...game}/>
      <pre>{JSON.stringify(game, null, 2)}</pre>
      <button onClick={() => navigate(-1)}> Back</button>
    </div>
  )
}