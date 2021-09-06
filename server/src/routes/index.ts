import Router from '@koa/router'

import * as indexController from 'controllers/index'
import * as imageController from 'controllers/api/image'
import * as userController from 'controllers/api/user'
import * as initController from 'controllers/api/init'

const router = new Router()

router.get(`/`, indexController.index)
router.get('/hello', indexController.hello)
// images demo
router.get("/api/images", imageController.getImages)
router.post("/api/images/upload", imageController.uploadImage)
// init
router.get('/api/init/database', initController.initDatabase)
// user
router.get('/api/get/user/info/:id', userController.getUserInfoById)

module.exports = router