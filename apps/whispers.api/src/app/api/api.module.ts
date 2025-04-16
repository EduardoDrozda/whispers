import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user";
import { UseCasesModule } from "../business/use-cases";
import { TraceModule } from "../infrastructure/trace";
import { JWTModule } from "../infrastructure/jwt";
import { AuthController } from "./controllers/auth/auth.controller";
import { WhisperController } from "./controllers/whisper/whisper.controller";

@Module({
  imports: [UseCasesModule, TraceModule, JWTModule],
  controllers: [UserController, AuthController, WhisperController],
})
export class ApiModule { }
