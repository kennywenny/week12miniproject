const Database = require('./src/database')
const MovieRoutes = require('./src/movieRoutes')
const RestServer = require('./src/restServer')
const ReviewRoutes = require('./src/reviewRoutes')

const port = process.env.PORT || 3001

const restServer = new RestServer(port)
const database = new Database()
const movieRoutes = new MovieRoutes(database)
const reviewRoutes = new ReviewRoutes(database)

async function startApplication() {
  const app = restServer.constructServer()
  app.use('/api', movieRoutes.getRouter())
  app.use('/api', reviewRoutes.getRouter())
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}

startApplication()