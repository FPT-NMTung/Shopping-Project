import mysql from 'mysql2'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number.parseInt(process.env.DB_PORT!),
})

export default pool.promise()