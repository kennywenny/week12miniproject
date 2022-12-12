const router = require('express').Router()

class ReviewRoutes {
  constructor(database) {
    this.database = database
  }

  getRouter() {
    router.get('/reviews', async (__, res) => {
      const db = await this.database.getConnection()
      const [results, _] = await db.query('select id, movie_id, review_text from reviews')
      res.json(results)
    })

    router.post('/create-review', async (req, res) => {
      const db = await this.database.getConnection()
      const { movie_id: movieId, review_text: reviewText } = req.body
      await db.query('insert into reviews (review_text, movie_id) values (?, ?)', [reviewText, movieId])
      res.status(201).end()
    })

    router.put('/update-review', async (req, res) => {
      const db = await this.database.getConnection()
      const { movie_id: movieId, review_text: reviewText, id } = req.body
      await db.query('update reviews set movie_id = ?, review_text = ? where id = ?', [movieId, reviewText, id])
      res.status(204).end()
    })

    return router
  }
}

module.exports = ReviewRoutes