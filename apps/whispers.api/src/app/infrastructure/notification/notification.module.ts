import { Global, Module } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { TraceModule } from "../trace";

@Global()
@Module({
  imports: [TraceModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
