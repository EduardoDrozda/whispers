import { HttpStatus, Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { TraceService } from '../trace';

export interface INotificationMessage {
  message: string;
  statusCode?: HttpStatus;
}

@Injectable()
export class NotificationService {
  private storage = new AsyncLocalStorage<Map<string, INotificationMessage>>();
  private readonly MAP_KEY: string;

  constructor(private readonly traceService: TraceService) {
    this.storage.enterWith(new Map<string, INotificationMessage>());
    this.MAP_KEY = `${this.traceService.traceId}:${this.MAP_KEY}`;
  }

  get hasNotification(): boolean {
    const store = this.storage.getStore();
    return store ? store.has(this.MAP_KEY) : false;
  }

  add(message: string, statusCode = HttpStatus.BAD_REQUEST): void {
    const messages: INotificationMessage = {
      message,
      statusCode,
    };

    const store = this.storage.getStore() || new Map<string, INotificationMessage>();
    store.set(this.MAP_KEY, messages);
    this.storage.enterWith(store);
  }

  getMessages(): INotificationMessage | undefined {
    return this.storage.getStore()?.get(this.MAP_KEY);
  }

  clear(): void {
    const store = this.storage.getStore();
    store?.delete(this.MAP_KEY);
  }
}
