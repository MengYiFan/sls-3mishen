export enum charset {
  utf8_general_ci = 'utf8_general_ci'
}
export interface dbInterface {
  host: string
  port: number
  user: string
  password?: string
  dbName: string
  charset?: charset
}