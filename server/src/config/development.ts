import { charset, dbInterface } from './interface'

export const dbConfig: dbInterface = {
  host: '127.0.0.1',
  port: 3306,
  user: process.env.DEV_MYSQL_USER,
  password: process.env.DEV_MYSQL_PWD,
  dbName: process.env.DEV_MYSQL_NAME,
  charset: charset.utf8_general_ci
}