import assert from 'assert'
import { isInteger, isBoolean, isObject } from 'lodash'

interface ErrorInfo {
  code: number,
  message: string
}

export interface Exception {
  success?: boolean
  result?: any
  error?: ErrorInfo
}

export class HttpException extends Error {
  public success: boolean = true
  public result: any = null
  public error: ErrorInfo | null = null

  constructor(ex?: Exception) {
    super()

    if (ex && ex.success) {
      assert(isBoolean(ex.success))
      this.success = ex.success
    }

    if (ex && ex.result) {
      this.result = ex.result
    }

    if (ex && ex.error) {
      this.error = ex.error
    }
  }
}

export class AutoFailed extends HttpException {
  public success = false
  public result = null
  public error = {
    code: 401,
    message: '认证失败'
  }

  constructor(ex?: Exception) {
    super()

    if (ex && ex.success) {
      assert(isBoolean(ex.success))
      this.success = ex.success
    }

    if (ex && ex.result) {
      this.result = ex.result
    }

    if (ex && ex.error) {
      this.error = ex.error
    }
  }
}