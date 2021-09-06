import { Context, Next } from "koa";
import { config } from 'config/index'
import { createUUID } from 'utils/index'
import { dbInterface } from 'config/interface'
import * as mysql from 'mysql2'

interface userInfoItem {
  id: number
  nickName: string
  avatarUrl: string
  unionId?: string
  openId?: string
  phone?: string
  email?: string
  isDestroy?: number
  type?: number
  create_time?: string
  updateTime?: string
}

export const getUserInfoById = async (ctx: Context, next: Next) => {
  const id = ctx.params.id
  const {
    user,
    password,
    host,
    port,
    database
  }: dbInterface = config?.db!

  const pool = mysql.createPool({
    host, 
    user, 
    database
  })
  const promisePool = pool.promise()
  const [rows, ] = await promisePool.query("SELECT * FROM user WHERE id = ?", [id])
  await pool.end()

  ctx.body = {
    success: true,
    error: null,
    result: (rows as any).length && rows[0] || null
  }
}
