const express = require('express')

const app = express()
const port = process.env.PORT || 3001

app.get('/api/movies', (req, res) => {
  res.send('Hello mum')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})