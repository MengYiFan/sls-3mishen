export enum charset {
  utf8_general_ci = 'utf8_general_ci'
}
export interface dbInterface {
  host: string | undefined
  port: number
  user: string | undefined
  password?: string
  database: string | undefined
  charset?: charset
}

export interface configInterface {
  db: dbInterface
}