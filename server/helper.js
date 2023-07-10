const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config()

// wrapper function for fetch to easily making api calls 
module.exports = async function fetchApi(endpoint, query) {
  let jsonData;
  await fetch(`https://api.igdb.com/v4/${endpoint}`,
  {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': process.env.CLIENT_ID,
      'Authorization': `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
    },
    body: query
  })
  .then(response => response.json())
  .then(data => jsonData = data)
  return jsonData;
}