const express = require('express')
const Database = require('./src/database')
const MovieRoutes = require('./src/movieRoutes')
const ReviewRoutes = require('./src/reviewRoutes')

const app = express()
const port = process.env.PORT || 3001

const database = new Database()
const movieRoutes = new MovieRoutes(database)
const reviewRoutes = new ReviewRoutes(database)

async function startApplication() {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/api', movieRoutes.getRouter())
  app.use('/api', reviewRoutes.getRouter())
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}

startApplication()