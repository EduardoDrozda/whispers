import { ExecutionContext } from "@nestjs/common";

export const executionContextMock = (url: string, traceHeader?: string): ExecutionContext => {
  const req = {
    url,
    header: jest.fn().mockImplementation((key: string) => {
      if (key === 'x-trace-id') return traceHeader;
      return undefined;
    }),
  };

  return {
    switchToHttp: () => ({
      getRequest: () => req,
    }),
  } as any as ExecutionContext;
};
