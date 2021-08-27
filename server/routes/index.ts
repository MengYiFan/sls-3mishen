require("dotenv").config()
import Router from '@koa/router'
import util from 'util'
import COS from 'cos-nodejs-sdk-v5'
import axios from 'axios'

const path = require('path')
const sendFile = require('koa-sendfile')

const router = new Router()

const { 
  TENCENT_SECRET_ID, TENCENT_SECRET_KEY,
  TENCENT_REGION, TENCENT_BUCKET
} = process.env

let cos = new COS({
  SecretId: TENCENT_SECRET_ID,
  SecretKey: TENCENT_SECRET_KEY
})

const putObjectSync = util.promisify(cos.putObject.bind(cos))
const getBucketSync = util.promisify(cos.getBucket.bind(cos))

const cosInfo = {
  Bucket: TENCENT_BUCKET,
  Region: TENCENT_REGION
}

router.get(`/`, async (ctx) => {
  await sendFile(ctx, path.join(__dirname, '../index.html'))
})

router.get('/hello', async function (ctx, next) {
  ctx.body = 'Hello, 3mish sls.'
})

router.get("/api/images", async (ctx) => {
  const files = await getBucketSync({
    ...cosInfo,
    Prefix: "result",
  })

  const cosURL = `https://${cosInfo.Bucket}.cos.${cosInfo.Region}.myqcloud.com`
  ctx.body = files.Contents.map((it) => {
    const [timestamp, size] = it.Key.split(".jpg")[0].split("__")
    const [width, height] = size.split("_")
    return {
      url: `${cosURL}/${it.Key}`,
      width,
      height,
      timestamp: Number(timestamp),
      name: it.Key,
    }
  })
    .filter(Boolean)
    .sort((a, b) => b.timestamp - a.timestamp)
})

router.post("/api/images/upload", async (ctx) => {
  console.log(ctx.request.files.file)
  const { imgBase64, style } = JSON.parse(ctx.request.body)
  const buf = Buffer.from(imgBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64')
  // 调用预先提供 tensorflow 服务加工图片，后面替换成你自己的服务
  const { data } = await axios.post('https://service-edtflvxk-1254074572.gz.apigw.tencentcs.com/release/', {
    imgBase64: buf.toString('base64'),
    style
  })
  if (data.success) {
    const afterImg = await putObjectSync({
      ...cosInfo,
      Key: `result/${Date.now()}__400_200.jpg`,
      Body: Buffer.from(data.data, 'base64'),
    })
    ctx.body = {
      success: true,
      data: 'https://' + afterImg.Location
    }
  }
})

module.exports = router