import { ConsoleLogger, Injectable } from "@nestjs/common";
import { TraceService } from "../trace/trace.service";

@Injectable()
export class LoggerService {
  private readonly logger: ConsoleLogger;

  private traceId!: string;

  constructor(private readonly trace: TraceService) {
    this.logger = new ConsoleLogger();
  }

  info(message: string): void {
    this.logger.log(this.buildMessage(message));
  }

  error(message: string): void {
    this.logger.error(this.buildMessage(message));
  }

  warning(message: string): void {
    this.logger.warn(this.buildMessage(message));
  }

  private buildMessage(message: string): string {
    this.traceId = this.trace.traceId;

    if (!this.traceId) {
      return message;
    }

    return `${this.traceId} - ${message}`;
  }
}
