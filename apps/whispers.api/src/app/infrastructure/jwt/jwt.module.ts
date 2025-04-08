import { Global, Module } from "@nestjs/common";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";
import { EnviromentModule, EnviromentService } from "../enviroment";

@Global()
@Module({
  imports: [
    NestJwtModule.registerAsync({
      imports: [EnviromentModule],
      useFactory: async (enviromentService: EnviromentService) => ({
        secret: enviromentService.get("JWT_SECRET"),
        signOptions: {
          expiresIn: enviromentService.get("JWT_EXPIRES_IN"),
        },
      }),
      inject: [EnviromentService],
    })],
  exports: [NestJwtModule]
})
export class JWTModule { }
