import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env-schema";
import path from "node:path";
import { EnviromentService } from "./enviroment.service";

@Global()
@Module({
  imports: [ConfigModule.forRoot({
    validate: (config) => envSchema.parse(config),
    isGlobal: true,
    envFilePath: [path.resolve(__dirname, '..', '..', '..', '.env')],
  })],
  providers: [EnviromentService],
  exports: [EnviromentService],
})
export class EnviromentModule { }
