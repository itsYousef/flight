import { HttpStatus } from "@nestjs/common"

export let Errors: ErrorManager = null

export class GlobalError extends Error {
  constructor(public errorContext: ErrorInfo, public error?: Error) {
    super(errorContext.message)
  }
}

class ErrorManager {
  private translationMap: Record<string, ErrorUnit> = {}

  constructor() {
    this.addTranslation({
      module: "*",
      code: 1,
      message: "ErrorCode Not Defined",
      translation: "خطا در پردازش اطلاعات"
    })
  }

  addTranslation(errInfo: ErrorInfo) {
    errInfo.statusCode = errInfo.statusCode || HttpStatus.BAD_REQUEST
    this.translationMap[errInfo.module] = this.translationMap[errInfo.module] || {}
    this.translationMap[errInfo.module][errInfo.code] = errInfo
  }

  addTranslations(errInfoList: ErrorInfo[]) {
    for (const errInfo of errInfoList) {
      this.addTranslation(errInfo)
    }
  }

  createClientError({ code, error, module }: CreateErrorInput) {
    const candidateError = this.findError({ module, code }) || this.findError({ code: 1, module: "*" })
    return new GlobalError(candidateError, error)
  }

  findError({ code, module }: FindErrorInput) {
    return this.translationMap[module] ? this.translationMap[module][code] : null
  }

  propagateNetworkError(error: any) {
    if (error.response?.data) {
      const errorInfo: ErrorInfo = error.response.data
      return new GlobalError(errorInfo)
    }
    else {
      return new Error("Network Error")
    }
  }

}

Errors = new ErrorManager()

type ErrorInfo = {
  code: number;
  module: any;
  translation: string;
  message: string;
  statusCode?: number;
}
type ErrorUnit = {
  [key: number]: ErrorInfo;
}

type CreateErrorInput = {
  module: string,
  code: number,
  error?: Error
}

type FindErrorInput = Omit<CreateErrorInput, "error">