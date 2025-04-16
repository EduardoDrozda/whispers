import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class TraceService {
  private storage = new AsyncLocalStorage<Map<string, string>>();

  get traceId(): string {
    return this.storage.getStore()?.get('traceId')!;
  }

  set traceId(traceId: string) {
    const store = this.storage.getStore() || new Map<string, string>();
    store.set('traceId', traceId);

    this.storage.enterWith(store);
  }
}
