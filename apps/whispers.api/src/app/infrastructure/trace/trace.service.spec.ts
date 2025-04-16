import { Test, TestingModule } from '@nestjs/testing';
import { TraceService } from './trace.service';
import { AsyncLocalStorage } from 'async_hooks';
import { v4 as uuidv4 } from 'uuid';

describe('TraceService', () => {
  let service: TraceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TraceService],
    }).compile();

    service = module.get<TraceService>(TraceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get and set trace id', () => {
    const mockTraceId = uuidv4();
    service.traceId = mockTraceId;
    expect(service.traceId).toBe(mockTraceId);
  });

  it('should handle undefined trace id', () => {
    const storage = new AsyncLocalStorage<Map<string, string>>();
    
    // Substituir o storage do serviço pelo mock vazio
    Object.defineProperty(service, 'storage', {
      value: storage,
      writable: true,
    });

    expect(service.traceId).toBeUndefined();
  });

  it('should update existing trace id', () => {
    const initialTraceId = uuidv4();
    const newTraceId = uuidv4();

    service.traceId = initialTraceId;
    expect(service.traceId).toBe(initialTraceId);

    service.traceId = newTraceId;
    expect(service.traceId).toBe(newTraceId);
  });
});
