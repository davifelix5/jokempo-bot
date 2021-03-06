require('dotenv').config()

const path = require('path')

module.exports = {

  development: {
    client: 'pg',
    connection: {
        host : process.env.PG_HOST,
        user : process.env.PG_USER,
        port: process.env.PG_PORT,
        password : process.env.PG_PASSWORD,
        database : process.env.PG_DATABASE,
    },
    ssl: { rejectUnauthorized: false },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 1,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
