import { HttpStatus } from '@nestjs/common';
import { nextMock } from '../../../../mocks/infrastructure/interceptors';
import { executionContextMock } from '../../../../mocks/infrastructure/interceptors/execution-context.mock';
import { notificationMock } from '../../../../mocks/infrastructure/notification';
import { NotificationService } from '../../notification';
import { BaseResponseInterceptor, IBaseResponse } from './base-response.interceptor';

describe('BaseResponseInterceptor', () => {
  let interceptor: BaseResponseInterceptor;
  let notificationService = { ...notificationMock } as any as NotificationService;
  let mockExecutionContext = executionContextMock
  let mockCallHandler = nextMock;

  beforeEach(() => {
    jest.clearAllMocks();
    interceptor = new BaseResponseInterceptor(notificationService);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });
});
