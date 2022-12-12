const express = require('express')
const mysql2 = require('mysql2/promise')

const app = express()
const port = process.env.PORT || 3001

async function startApplication() {
  const db = await mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'movie_db'
  })

  app.get('/api/movies', async (req, res) => {
    const [results, _] = await db.query('select name from movies')
    const movieNames = results.map(it => it.name)
    res.json(movieNames)
  })

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}

startApplication()