import { CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

export const nextMock = (data: Observable<any>): CallHandler<any> => ({
  handle: () => data,
});
