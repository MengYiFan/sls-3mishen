// node -r ts-node/register/transpile-only
require("ts-node").register({ 
  transpileOnly: true
})

const tsConfig = require("./tsconfig.json")
const { baseUrl, paths } = tsConfig.compilerOptions
require("tsconfig-paths").register({
  baseUrl,
  paths
})

module.exports = require("./app.ts")
