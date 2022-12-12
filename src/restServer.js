const express = require('express')

class RestServer {
  constructServer() {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    return app
  }
}

module.exports = RestServer