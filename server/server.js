const fetchApi = require('./helper')
const express = require('express')
const app = express()

  // GET ALL GAMES INFORMATION
  // Landing page
  app.get("/api/games", async (req, res) => {

    const gamesData = await fetchApi(
      'games', 
      'fields name, cover, genres, rating, rating_count; sort id asc; limit 100;'
    )
    const coverData = await fetchApi(
      'covers',
      'fields image_id; sort game asc; limit 100;'
    )
    const genreData = await fetchApi(
      'genres',
      'fields *; limit 100;'
    )
    
    // data manipulation
    let data = gamesData;

    data.map(game => {
      game.genres = game.genres.map((g) => { return genreData.find((genre) => g === genre.id).name})
      game.cover = {...coverData.find((cover) => (game.cover === cover.id))}
    })

    res.send(data)
  })

  app.get("/api/covers", async (req, res) => {
    res.json(
      await fetchApi(
      'covers', 
      'fields game,image_id; limit 1; sort game asc;'
      )
    )
  })

  app.get("/api/genres", async (req, res) => {
    res.json(
      await fetchApi(
      'genres', 
      'fields name; limit 500; sort id asc;'
      )
    )
  })



app.listen(3500, () => {console.log("Server started on port 3500") })