require('dotenv').config();

const config ={
  username: process.env.PG_DB_USERNAME,
  password: process.env.PG_DB_PASSWORD,
  database: process.env.PG_DB_NAME,
  host: process.env.PG_DB_HOSTNAME,
  dialect: 'postgres'
};

module.exports = {
  development: {
    ...config,
    dialectOptions: {
      "ssl": true
    }
  },
  test: {
    ...config,
  },
  production: {
    ...config,
  }
};