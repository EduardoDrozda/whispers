import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TraceService } from '../../trace';
import { randomUUID } from 'crypto';

@Injectable()
export class BaseRequestInterceptor implements NestInterceptor {
  constructor(
    private readonly traceService: TraceService
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const url = req.url;

    if (url.startsWith('/health')) {
      return next.handle();
    }

    const traceId = req.header('x-trace-id') || randomUUID();

    this.traceService.traceId = traceId;
    return next.handle();
  }
}
