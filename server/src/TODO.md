### Todo list
  - 确定设计 or 引用第三方可靠的评论和社交系统 - 09.18
  - 程序关键的阅读和反馈交互设计 - 09.18
##### 评论系统的设计

##### interface
- User
  - get:  /user/:id/info
  - post: /update/user/info
  - post: /binding/user/info/:platform (wechat | phone | email)
  - get:  /platform/verification/code (Query: phone | email)

- wx
  - get:  /wechat/get/token
  - get:  /wechat/validate/token // 校验TOKEN是否有效期内
  - post: /wechat/session/key
  - post: /wechat/message/receiver // 保存授信人信息，用于之后发送模板信息
  - post: /wechat/send/message
  - post: /wechat/biz/data/crypt

- story
  - get:  /story/List
  - get:  /story/:id/info
  - get:  /story/:id/section/list
  - get:  /story/:id/section/:index/detail
  // update
  - post: /update/story/info
  - post: /update/story/detail
  // get detail
  - get:  /story/:id/section/:index/comment
  - get:  /story/:id/section/barrage/list
  - get:  /story/:id/section/:index/barrage/list
  // send
  - post: /send/story/comment
  - post: /send/story/section/barrage
  - post: /send/story/section/sentence/comment
  // expression
  - post: /expression/story
  - post: /expression/story/comment
  - post: /expression/story/section
  - post: /expression/story/section/barrage
  - post: /expression/story/section/sentence
  - post: /expression/story/section/sentence/comment
  // delete
  - post: /delete/story/comment
  - post: /delete/story/section/barrage
  - post: /delete/story/section/sentence/comment
  - // report
  - post: /report/story
  - post: /report/story/section
  - post: /report/story/section/sentence
  - post: /report/story/comment
  - post: /report/story/section/barrage
  - post: /report/story/section/sentence/comment
- operate
  - get:  /story/recommendation/list
  - get:  /get/home/banner
  - get:  /get/activity/banner
  
##### 待确认和解决
- add a new declaration (.d.ts) file containing `declare module 'koa-sendfile';`
  在 `index.d.ts declare` 了也无效，当前是通过 `tsconfig.json` 里设置 `noImplicitAny: false` 解决
- 在 `controllers/api/image.ts` 会出现 `Object is of type 'unknown'.` 的报错，目前是通过 `(files as any)` 解决