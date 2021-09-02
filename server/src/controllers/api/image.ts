require("dotenv").config()
import { BaseContext, Next } from "koa";
import Router from '@koa/router'
import util from 'util'
import COS from 'cos-nodejs-sdk-v5'
import axios from 'axios'

const { 
  TENCENT_SECRET_ID, TENCENT_SECRET_KEY,
  TENCENT_REGION, TENCENT_BUCKET
} = process.env

const IMG_DIR = 'images'
const cosInfo = {
  Bucket: String(TENCENT_BUCKET),
  Region: String(TENCENT_REGION)
}
let cos = new COS({
  SecretId: TENCENT_SECRET_ID,
  SecretKey: TENCENT_SECRET_KEY
})

const putObjectSync = util.promisify(cos.putObject.bind(cos))
const getBucketSync = util.promisify(cos.getBucket.bind(cos))

export const getImages = async(ctx: BaseContext, next: Next) => {
  const files = await getBucketSync({
    ...cosInfo,
    Prefix: IMG_DIR,
  })
  
  const cosURL = `https://${cosInfo.Bucket}.cos.${cosInfo.Region}.myqcloud.com`
  ctx.body = (files as any).Contents.map((image) => {
    const [timestamp, size] = image.Key.split(".jpg")[0].split("__")
    const [width, height] = size.split("_")
    
    return {
      url: `${cosURL}/${image.Key}`,
      width,
      height,
      timestamp: Number(timestamp),
      name: image.Key,
    }
  })
    .filter(Boolean)
    .sort((a, b) => b.timestamp - a.timestamp)
}

export const uploadImage = async(ctx, next) => {
  const { imgBase64, style } = JSON.parse(ctx.request.body)
  const buf = Buffer.from(imgBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64')
  const { data } = await axios.post('https://service-mthxz2ip-1253427742.sh.apigw.tencentcs.com/release/', {
    imgBase64: buf.toString('base64'),
    style
  })

  if (data.success) {
    const afterImg = await putObjectSync({
      ...cosInfo,
      Key: `${IMG_DIR}/${Date.now()}__400_200.jpg`,
      Body: Buffer.from(data.data, 'base64')
    })
  
    ctx.body = {
      success: true,
      data: 'https://' + (afterImg as any).Location
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}