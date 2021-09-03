import Koa from 'koa'
import Router from '@koa/router'
import koaBody from 'koa-body'
import cors from '@koa/cors'

const app = new Koa()
const router = new Router()

app.use(cors())
app.use(koaBody({
  multipart: true,
  formLimit: "10mb",
  jsonLimit: '10mb',
  textLimit: "10mb"
}))

// middlewares
import * as requestTrack from 'middlewares/requestTrack'
app.use(requestTrack.default)

const index = require('./routes/index')
app.use(index.routes()).use(index.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

const port = 8080
app.listen(port, () => {
  console.log("listen in http://localhost: %s", port)
})

module.exports = app