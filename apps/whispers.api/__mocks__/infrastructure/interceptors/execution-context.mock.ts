import { ExecutionContext } from '@nestjs/common';

export const executionContextMock = (url = '/api/test') => {
  const context: ExecutionContext = {
    switchToHttp: () => ({
      getRequest: () => ({
        url,
      }),
      getResponse: () => ({
        status: jest.fn(),
      }),
    }),
    getClass: () => undefined,
    getHandler: () => undefined,
    getArgs: () => [],
    getArgByIndex: () => undefined,
    getType: () => 'http',
    switchToRpc: () => ({
      getContext: () => ({}),
      getData: () => ({}),
    }),
    switchToWs: () => ({
      getClient: () => ({}),
      getData: () => ({}),
    }),
  };

  return context;
};
