import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user";
import { UseCasesModule } from "../business/use-cases";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { BaseRequestInterceptor, BaseResponseInterceptor } from "../infrastructure/interceptors";
import { TraceModule } from "../infrastructure/trace";

@Module({
  imports: [UseCasesModule, TraceModule],
  controllers: [UserController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: BaseRequestInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: BaseResponseInterceptor,
    },
  ],

})
export class ApiModule { }
