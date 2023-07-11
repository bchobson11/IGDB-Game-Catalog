const fetchApi = require('./helper')
const express = require('express')
const app = express()

  // GET ALL GAMES INFORMATION
  // Landing page
  app.get("/api/games", async (req, res) => {

    const gamesData = await fetchApi(
      'games', 
      `
        fields name, cover.image_id, genres.name, release_dates.platform.name, rating, rating_count; 
        sort id asc; 
        limit 100;
      `
    )
    
    res.json(gamesData)
  })

app.listen(3500, () => {console.log("Server started on port 3500") })