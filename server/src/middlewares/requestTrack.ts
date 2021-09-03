import { BaseContext, Next } from 'koa'
import { createUUID } from 'utils/index'

const requestTrack = async (ctx: BaseContext, next: Next): Promise<void> => {
  const requestID = createUUID()
  
  await next()

  if (Object.prototype.toString.call(ctx.body) === '[object Object]') {
    console.log(1, ctx.body)
    ctx.body = Object.assign({}, ctx.body, {
      _: requestID
    })
  }
}

export default requestTrack