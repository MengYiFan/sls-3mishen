import { partial } from "lodash"

export enum charset {
  utf8_general_ci = 'utf8_general_ci'
}

interface dbInterfaceConfig {
  host: string
  port: number
  user: string
  password: string
  database: string
  charset: charset
}

export type dbInterface = Partial<dbInterfaceConfig>

export interface configInterface {
  db: dbInterface
}