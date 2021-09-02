require("dotenv").config()
import * as development from './development'
import * as production from './production'

export default {
  development,
  production
}[process.env.NODE_ENV || 'development']