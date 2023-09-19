require('dotenv').config()
const express = require('express')
const apicalypse = require('apicalypse').default

const app = express()

const requestOptions = {
  method: 'POST',
  baseURL: 'https://api.igdb.com/v4',
  headers: {
    'Accept': 'application/json',
    'Client-ID': process.env.CLIENT_ID,
    'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
  },
};

  // Get all games information
  app.get("/api/games/:offset/:limit", async (req, res) => {
    const {offset, limit} = req.params
    const search = req.query.search

    const response = await apicalypse(requestOptions)
      .fields(['name','cover.image_id', 'genres.name', 'platforms.name', 'platforms.platform_logo.image_id', 'rating', 'rating_count'])
      .limit(limit)
      .offset(offset)
      .search(search)
      .where('platforms.category = (1)')
      .request('/games')
      
      res.json(response.data)
  })

  // GET ONE GAME'S INFO BASED ON ID
  app.get("/api/game/:id", async (req, res) => {
    const id = req.params.id

    const response = await apicalypse(requestOptions)
      .fields('name, game_modes.name, player_perspectives.name, websites.url, websites.category, themes.name, game_engines.name, involved_companies.company.name, cover.image_id, similar_games.name, similar_games.cover.image_id, summary, storyline, genres.name, screenshots.image_id, videos.name, videos.video_id, platforms.name')
      .where(`id = ${id}`)
      .request('/games')

    res.json(response.data[0])
  })

app.listen(3500, () => {console.log("Server started on port 3500") })