import { BaseContext, Next } from "koa";
import path from 'path'
import sendFile from 'koa-sendfile'

export const index = async (ctx: BaseContext, next: Next) => {
  await sendFile(ctx, path.join(__dirname, '../index.html'))
}

import * as d from 'config/index'
import { createUUID } from 'utils/index'

export const hello = (ctx: BaseContext, next: Next) => {
  ctx.body = 'Hello, 3mish sls.'
}