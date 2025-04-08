import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user";
import { UseCasesModule } from "../business/use-cases";
import { TraceModule } from "../infrastructure/trace";
import { JWTModule } from "../infrastructure/jwt";
import { AuthController } from "./controllers/auth/auth.controller";

@Module({
  imports: [UseCasesModule, TraceModule, JWTModule],
  controllers: [UserController, AuthController],
})
export class ApiModule { }
