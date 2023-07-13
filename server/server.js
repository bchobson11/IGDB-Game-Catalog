const fetchApi = require('./helper')
const express = require('express')
const app = express()

  // GET ALL GAMES INFORMATION
  app.get("/api/games/:offset/:limit", async (req, res) => {
    const {offset, limit} = req.params
    const search = req.query.search
    // const searchQuery1 = (search !== "" ? `search "${search}";` : "")
    let searchQuery = ""
    if (search === "" || search === undefined) {
      searchQuery = ""
    } else {
      searchQuery = `search "${search}";`
    }

    const gamesData = await fetchApi(
      'games', 
      `
        fields name, cover.image_id, genres.name, release_dates.platform.name, rating, rating_count; 
        offset ${offset};
        limit ${limit};
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
        fields name, cover.image_id, genres.name, release_dates.platform.name, rating, rating_count;  
        where id = ${req.params.id};
      `
    )
    res.json(gameData[0])
  })

app.listen(3500, () => {console.log("Server started on port 3500") })