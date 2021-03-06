require("dotenv").config()
import { charset, dbInterface } from './interface'

export const db: dbInterface = {
  host: process.env.MYSQL_HOST,
  port: 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_NAME,
  charset: charset.utf8_general_ci
}