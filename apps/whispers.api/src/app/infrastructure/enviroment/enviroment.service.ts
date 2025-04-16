import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvTypes } from "./env-schema";

@Injectable()
export class EnviromentService {
  constructor(private readonly configService: ConfigService<EnvTypes>) {}

  get(key: keyof EnvTypes): string | undefined {
    return this.configService.get(key);
  }
}
