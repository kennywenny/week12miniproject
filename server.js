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

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.get('/api/movies', async (__, res) => {
    const [results, _] = await db.query('select id, name from movies')
    res.json(results)
  })

  app.post('/api/add-movie', async (req, res) => {
    const { name } = req.body
    await db.query(`insert into movies (name) values (?);`, name)
    res.status(201).end()
  })

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}

startApplication()