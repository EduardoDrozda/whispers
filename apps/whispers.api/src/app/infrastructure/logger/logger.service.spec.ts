import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';
import { TraceService } from '../trace/trace.service';
import { traceMock } from '../../../mocks/infrastructure/trace';
import { ConsoleLogger } from '@nestjs/common';

describe('LoggerService', () => {
  let service: LoggerService;
  let trace = { ...traceMock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggerService,
        {
          provide: TraceService,
          useValue: trace,
        },
      ],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log info message with trace id', () => {
    const loggerSpy = jest.spyOn(ConsoleLogger.prototype, 'log').mockImplementation();
    const message = 'Test info message';
    const expectedMessage = `${trace.traceId} - ${message}`;

    service.info(message);
    expect(loggerSpy).toHaveBeenCalledWith(expectedMessage);
  });

  it('should log error message with trace id', () => {
    const loggerSpy = jest.spyOn(ConsoleLogger.prototype, 'error').mockImplementation();
    const message = 'Test error message';
    const expectedMessage = `${trace.traceId} - ${message}`;

    service.error(message);

    expect(loggerSpy).toHaveBeenCalledWith(expectedMessage);
  });

  it('should log warning message with trace id', () => {
    const loggerSpy = jest.spyOn(ConsoleLogger.prototype, 'warn').mockImplementation();
    const message = 'Test warning message';
    const expectedMessage = `${trace.traceId} - ${message}`;

    service.warning(message);

    expect(loggerSpy).toHaveBeenCalledWith(expectedMessage);
  });

  it('should log message without trace id when trace id is not available', () => {
    const loggerSpy = jest.spyOn(ConsoleLogger.prototype, 'log').mockImplementation();
    const message = 'Test message without trace';
    trace.traceId = '';

    service.info(message);

    expect(loggerSpy).toHaveBeenCalledWith(message);
  });
});
