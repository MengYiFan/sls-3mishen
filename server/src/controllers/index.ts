import { BaseContext, Next } from "koa";
import path from 'path'
import sendFile from 'koa-sendfile'

export const index = async (ctx: BaseContext, next: Next) => {
  await sendFile(ctx, path.join(__dirname, '../index.html'))
}

export const hello = async (ctx: BaseContext, next: Next) => {
  ctx.body = 'Hello, 3mish sls.'
}