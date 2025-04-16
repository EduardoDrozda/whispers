import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { NotificationService } from '../../notification/notification.service';

export interface IBaseResponse<T> {
  error: boolean;
  errorMessages?: { message: string; statusCode?: HttpStatus };
  result: T | null;
  stackTrace?: string;
  status?: HttpStatus;
}

@Injectable()
export class BaseResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly notification: NotificationService,
  ) { }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const url = context.switchToHttp().getRequest().url as string;
    const response = context.switchToHttp().getResponse();

    if (url.startsWith('/health')) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        if (this.notification.hasNotification) {
          const notification = { ...this.notification.getMessages()! };
          const statusCode = notification.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
          this.notification.clear();
          response.status(
            statusCode
          );

          return {
            error: true,
            errorMessages: notification,
            result: null,
            status: statusCode,
          } as IBaseResponse<any>;
        }

        return {
          error: false,
          result: data,
          status: response.statusCode,
        } as IBaseResponse<any>;
      }),
    );
  }
}
