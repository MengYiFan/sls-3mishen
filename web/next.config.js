const isProd = process.env.NODE_ENV === 'production'

const STATIC_URL = 'https://3mish-cos-1253427742.cos.ap-shanghai.myqcloud.com'

module.exports = {
  assetPrefix: isProd ? STATIC_URL : ''
}