import { useEffect, useState } from "react"
import GameCard from "../components/GameCard"
import { useParams } from "react-router-dom"

// Route "/game/:id"
export default function GameInfo() {

  const [game, setGame] = useState({})

  const { id } = useParams()

  useEffect(() => {
    fetch(`/api/game/${id}`)
      .then(response => response.json())
      .then(data => {setGame(data)})
    }, [])

  return (
    <GameCard {...game}/>
  )
}