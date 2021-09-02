import Router from '@koa/router'

import * as indexController from 'controllers/index'
import * as imageController from 'controllers/api/image'

const router = new Router()

router.get(`/`, indexController.index)
router.get('/hello', indexController.hello)

router.get("/api/images", imageController.getImages)
router.post("/api/images/upload", imageController.uploadImage)

module.exports = router