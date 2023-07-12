const fetchApi = require('./helper')
const express = require('express')
const app = express()

  // 238,434 total games

  // GET ALL GAMES INFORMATION
  app.get("/api/games", async (req, res) => {
    
    const gamesData = await fetchApi(
      'games', 
      `
        fields name, cover.image_id, genres.name, release_dates.platform.name, rating, rating_count; 
        offset 0;
        limit 100;
      `
    )
  
    res.json(gamesData)
  })

  // Get games based on search
  app.get("/api/games/:search", async (req, res) => {
    const {search} = req.params
    const gamesData = await fetchApi(
      'games', 
      `
        fields name, cover.image_id, genres.name, release_dates.platform.name, rating, rating_count; 
        limit 300;
        search "${search}";
      `
    )
    
    res.json(gamesData)
  })

  // GET ONE GAME'S INFO BASED ON ID
  app.get("/api/game/:id", async (req, res) => {

    const gameData = await fetchApi(
      'games', 
      `
        fields name, cover.image_id, genres.name, release_dates.platform.name, rating, rating_count;  
        where id = ${req.params.id};
      `
    )
    res.json(gameData[0])
  })

app.listen(3500, () => {console.log("Server started on port 3500") })