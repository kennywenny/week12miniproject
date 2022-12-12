const mysql2 = require('mysql2/promise')

class Database {
  async getConnection() {
    if (this.connection) {
      console.log('Connection already exists')
      return this.connection
    }
    console.log('Making a database connection')
    this.connection = await mysql2.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'movie_db'
    })
    return this.connection
  }
}

module.exports = Database