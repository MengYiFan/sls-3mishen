- add a new declaration (.d.ts) file containing `declare module 'koa-sendfile';`
  在 `index.d.ts declare` 了也无效，当前是通过 `tsconfig.json` 里设置 `noImplicitAny: false` 解决
- 在 `controllers/api/image.ts` 会出现 `Object is of type 'unknown'.` 的报错，目前是通过 `(files as any)` 解决