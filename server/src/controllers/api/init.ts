require("dotenv").config()
import { Context, Next } from "koa";
import { config } from 'config/index'
import { dbInterface } from 'config/interface'
import * as mysql from 'mysql2/promise'
import { pmsGetInitSQLString } from 'core/init'

export const initDatabase = async (ctx: Context, next: Next) => {
  let secret = ctx.query.initSqlSecret

  if (secret !== process.env.INIT_SQL_SECRET) {
    ctx.body = {
      success: false
    }
  } else {
    let sqlList = await pmsGetInitSQLString()
    const {
      user,
      password,
      host,
      port,
      database
    }: dbInterface = config?.db!
  
    const conn = await mysql.createConnection({
      host, 
      user, 
      database
    })
    
    await Promise.all(sqlList.map(async sql => {
      await conn.query(sql)
    }))
    await conn.end()

    ctx.body = {
      success: true
    }
  }
}