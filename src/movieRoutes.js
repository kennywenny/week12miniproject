const router = require('express').Router()

class MovieRoutes {
  constructor(database) {
    this.database = database
  }

  getRouter() {
    router.get('/movies', async (__, res) => {
      const db = await this.database.getConnection()
      const [results, _] = await db.query('select id, name from movies')
      res.json(results)
    })

    router.post('/add-movie', async (req, res) => {
      const { name } = req.body
      const db = await this.database.getConnection()
      await db.query('insert into movies (name) values (?);', name)
      res.status(201).end()
    })

    router.delete('/movie/:id', async (req, res) => {
      const db = await this.database.getConnection()
      await db.query('delete from movies where id = ?', req.params.id)
      res.send('Hello Sam')
    })

    return router
  }
}

module.exports = MovieRoutes