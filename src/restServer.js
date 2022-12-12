const express = require('express')

class RestServer {
  constructor(port) {
    this.port = port
  }

  constructServer() {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    return app
  }
}

module.exports = RestServer