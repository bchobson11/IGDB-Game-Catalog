const fetchApi = require('./helper')
const express = require('express')
const app = express()

  // GET ALL GAMES INFORMATION
  app.get("/api/games/:offset/:limit", async (req, res) => {
    const {offset, limit} = req.params
    const search = req.query.search
    const searchQuery = (search === "" || search === undefined) ? "" : `search "${search}";`
    

    /*

      * can have multiple where statements *

      search by platform
      where platforms.platform_family.name = "Xbox";

      where platforms.category = (1,2,3,4,5,6); 
      1: console, 2: arcade, 3: platform, 4: operating system, 5: portable-console, 6: computer


    */
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
        fields name, game_localizations.region.name, themes.name, game_engines.name, involved_companies.company.name, involved_companies.*, involved_companies.publisher, cover.image_id, similar_games.name, similar_games.cover.image_id, summary, storyline, genres.name, artworks.image_id, screenshots.image_id, videos.name, videos.video_id, platforms.name, rating, rating_count;  
        where id = ${req.params.id};
      `
    )
    res.json(gameData[0])
  })

app.listen(3500, () => {console.log("Server started on port 3500") })