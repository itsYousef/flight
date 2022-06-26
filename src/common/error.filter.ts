import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { GlobalError } from "./error-manager";

@Catch()
export class CoreExceptionFilter implements ExceptionFilter {

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status: HttpStatus = HttpStatus.BAD_REQUEST
    let message: string;
    let translation: string;
    let debugError: Error = null
    let code = null;

    if (exception instanceof GlobalError) {
      message = exception.errorContext.message
      translation = exception.errorContext.translation
      status = exception.errorContext.statusCode
      code = exception.errorContext.code
      debugError = exception.error
    }
    else if (exception instanceof Error) {
      message = exception.message
      status = HttpStatus.INTERNAL_SERVER_ERROR
      debugError = exception
    }
    else if (typeof exception == "string") {
      message = exception
      status = HttpStatus.INTERNAL_SERVER_ERROR
      debugError = new Error(exception)
    }
    else {
      message = exception as string
      status = HttpStatus.INTERNAL_SERVER_ERROR
      debugError = new Error(message)
    }

    // Logging
    console.error(exception)

    return response.status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
        translation,
        debugError
      });
  }
}