const express = require('express')
const Database = require('./src/database')
const MovieRoutes = require('./src/movieRoutes')

const app = express()
const port = process.env.PORT || 3001

const database = new Database()
const movieRoutes = new MovieRoutes(database)

async function startApplication() {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/api', movieRoutes.getRouter())

  app.get('/api/reviews', async (__, res) => {
    const db = await database.getConnection()
    const [results, _] = await db.query('select id, movie_id, review_text from reviews')
    res.json(results)
  })

  app.post('/api/create-review', async (req, res) => {
    const db = await database.getConnection()
    const { movie_id: movieId, review_text: reviewText } = req.body
    await db.query('insert into reviews (review_text, movie_id) values (?, ?)', [reviewText, movieId])
    res.status(201).end()
  })

  app.put('/api/update-review', async (req, res) => {
    const db = await database.getConnection()
    const { movie_id: movieId, review_text: reviewText, id } = req.body
    await db.query('update reviews set movie_id = ?, review_text = ? where id = ?', [movieId, reviewText, id])
    res.status(204).end()
  })

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}

startApplication()