require("dotenv").config()
import * as development from './development'
import * as production from './production'
import { configInterface } from './interface'

export const config: configInterface = ({
  development,
  production
}[process.env.NODE_ENV || 'development'])!