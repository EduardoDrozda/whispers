import { nextMock } from '../../../../mocks/infrastructure/interceptors/next.mock';
import { executionContextMock } from '../../../../mocks/infrastructure/interceptors/execution-context.mock';
import { TraceService } from '../../trace';
import { BaseRequestInterceptor } from './base-request.interceptor';

describe('BaseRequestInterceptor', () => {
  let interceptor: BaseRequestInterceptor;
  let traceService: TraceService;
  let mockExecutionContext = executionContextMock
  let mockCallHandler = nextMock;

  beforeEach(() => {
    jest.clearAllMocks();
    traceService = new TraceService();
    interceptor = new BaseRequestInterceptor(traceService);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should skip setting traceId if URL starts with /health', () => {
    const context = mockExecutionContext('/health');
    const next = mockCallHandler();

    interceptor.intercept(context, next).subscribe((result) => {
      expect(traceService.traceId).toBe(undefined);
      expect(next.handle).toHaveBeenCalled();
      expect(result).toBe('response');
    });
  });

  it('should set traceId from request header if present', () => {
    const traceId = 'custom-trace-id';
    const context = mockExecutionContext('/api/data', traceId);
    const next = mockCallHandler();

    interceptor.intercept(context, next).subscribe((result) => {
      expect(traceService.traceId).toBe(traceId);
      expect(next.handle).toHaveBeenCalled();
      expect(result).toBe('response');
    });
  });

  it('should generate traceId if header is not present', () => {
    const context = mockExecutionContext('/api/data');
    const next = mockCallHandler();

    interceptor.intercept(context, next).subscribe((result) => {
      expect(traceService.traceId).toBeDefined();
      expect(typeof traceService.traceId).toBe('string');
      expect(traceService.traceId).toHaveLength(36); // UUID length
      expect(next.handle).toHaveBeenCalled();
      expect(result).toBe('response');
    });
  });
});
