import { Context, Next } from 'koa'
import { createUUID } from 'utils/index'
import { Exception, HttpException } from 'core/exception'

const requestTrack = async (ctx: Context, next: Next): Promise<void> => {
  const requestID = createUUID()
  ctx.set('request-id', requestID)
  try {
    await next()
  } catch(error: any) {
    const isHttpException = error instanceof HttpException
    const isDev = process.env.NODE_ENV === 'development'

    if (isDev && !isHttpException) {
      throw error
    }

    const errorResp: Exception = {
      success: false,
      error: {
        code: isHttpException ? error?.errorCode : 999,
        message: error.msg || ''
      },
      result: null
    }

    ctx.body = errorResp
    ctx.status = isHttpException ? error.code : 500
  }
}

export default requestTrack