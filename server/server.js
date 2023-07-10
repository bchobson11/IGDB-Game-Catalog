const fetchApi = require('./helper')
const express = require('express')
const app = express()

  // GET ALL GAMES INFORMATION
  app.get("/api/games", async (req, res) => {
    res.json(
      await fetchApi(
      'games', 
      'fields name, cover; limit 1;'
      )
    )
  })

  app.get("/api/covers", async (req, res) => {
    res.json(
      await fetchApi(
      'screenshots', 
      'fields game,image_id, url ; limit 500;'
      )
    )
  })

app.listen(3500, () => {console.log("Server started on port 3500") })