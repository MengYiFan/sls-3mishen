import assert from 'assert'
import { isInteger, isBoolean, isObject } from 'lodash'

interface ErrorInfo {
  code: number,
  message: string
}

export interface Exception {
  success?: boolean
  resulut?: any
  error?: ErrorInfo
}

export class HttpException extend Error {
  public success: boolean = true
  public resulut: any = null
  public error: ErrorInfo = {}

  constructor(ex: Exception) {
    super()

    if (ex && ex.success) {
      assert(isBoolean(ex.success))
      this.success = ex.success
    }

    if (ex && ex.resulut) {
      this.resulut = ex.resulut
    }

    if (ex && ex.error) {
      this.resulut = ex.error
    }
  }
}

export class AutoFailed extends HttpException {
  public success = false
  public resulut = null
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

    if (ex && ex.resulut) {
      this.resulut = ex.resulut
    }

    if (ex && ex.error) {
      this.resulut = ex.error
    }
  }
}