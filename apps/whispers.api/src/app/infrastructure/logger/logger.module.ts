import { Global, Module } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import { TraceModule } from "../trace/trace.module";

@Global()
@Module({
  imports: [TraceModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
