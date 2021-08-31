#### 需要注意的问题
- 由于 Tencent SLS 大小有 `500M` 的限制，可以通过将 `model 和 node_modules` 挂载到 CFS 去规避这个问题。 可用 `ds -h` 查看挂载情况
- 如果出现：
`Error: The Node.js native addon module (tfjs_binding.node) can not be found at path: /{yourCFSPath}/tfjs_binding.node`, 
可通过 
`npm rebuild @tensorflow/tfjs-node build-addon-from-source` 解决（需先安装 gcc-c++）

#### 参考链接
[图片艺术化教程](https://zhuanlan.zhihu.com/p/218803108)
[挂载 CFS 官方文档](https://cloud.tencent.com/document/product/583/46199)
[TF Model下载](https://zhuanlan.zhihu.com/p/218803108)