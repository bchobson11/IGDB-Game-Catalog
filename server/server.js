const fetchApi = require('./helper')
const express = require('express')
const app = express()

  // GET ALL GAMES INFORMATION
  app.get("/api/games/:offset/:limit", async (req, res) => {
    const {offset, limit} = req.params
    const search = req.query.search
    const searchQuery = (search === "" || search === undefined) ? "" : `search "${search}";`
    
    const gamesData = await fetchApi(
      'games', 
      `
        fields name, cover.image_id, genres.name, platforms.name, platforms.platform_logo.image_id, rating, rating_count; 
        offset ${offset};
        limit ${limit};
        where platforms.category = (1); 
        ${searchQuery}
      `
    )
  
    res.json(gamesData)
  })

  // GET ONE GAME'S INFO BASED ON ID
  app.get("/api/game/:id", async (req, res) => {

    const gameData = await fetchApi(
      'games', 
      `
        fields name, game_modes.name, player_perspectives.name, websites.url, websites.category, themes.name, game_engines.name, involved_companies.company.name, cover.image_id, similar_games.name, similar_games.cover.image_id, summary, storyline, genres.name, screenshots.image_id, videos.name, videos.video_id, platforms.name;  
        where id = ${req.params.id};
      `
    )
    res.json(gameData[0])
  })

app.listen(3500, () => {console.log("Server started on port 3500") })