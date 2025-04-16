import { ArgumentsHost, Catch, ExceptionFilter, UnauthorizedException } from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggerService } from '../../logger';
import { IBaseResponse } from '../../interceptors';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter<T> implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) { }

  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse: IBaseResponse<string> = {
      error: true,
      errorMessages: {
        message: exception.message,
        statusCode: status,
      },
      result: null
    }

    this.loggerService.error(
      `UnauthorizedException: ${exception.message} - url: ${request.url} - method: ${request.method} - timestamp: ${new Date().toISOString()}`,
    );

    return response.status(status).json(errorResponse);
  }
}
