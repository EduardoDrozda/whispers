import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { TraceService } from '../trace';
import { traceMock } from '../../../mocks/infrastructure/trace';
import { HttpStatus } from '@nestjs/common';

describe('NotificationService', () => {
  let service: NotificationService;
  let traceServiceMock = { ...traceMock };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: TraceService,
          useValue: traceServiceMock,
        },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add notification with default status code', () => {
    const message = 'Test notification';

    service.add(message);

    expect(service.hasNotification).toBeTruthy();
    expect(service.getMessages()).toEqual({
      message,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  });

  it('should add notification with custom status code', () => {
    const message = 'Test notification';
    const statusCode = HttpStatus.NOT_FOUND;

    service.add(message, statusCode);

    expect(service.hasNotification).toBeTruthy();
    expect(service.getMessages()).toEqual({
      message,
      statusCode,
    });
  });

  it('should clear notifications', () => {
    const message = 'Test notification';
    service.add(message);

    expect(service.hasNotification).toBeTruthy();

    service.clear();

    expect(service.hasNotification).toBeFalsy();
    expect(service.getMessages()).toBeUndefined();
  });

  it('should handle multiple notifications in sequence', () => {
    const message1 = 'First notification';
    const message2 = 'Second notification';

    service.add(message1);
    expect(service.getMessages()).toEqual({
      message: message1,
      statusCode: HttpStatus.BAD_REQUEST,
    });

    service.add(message2, HttpStatus.NOT_FOUND);
    expect(service.getMessages()).toEqual({
      message: message2,
      statusCode: HttpStatus.NOT_FOUND,
    });
  });
});
