import { INestApplication, ValidationPipe, VersioningType } from "@nestjs/common";
import { EnviromentService } from "./infrastructure/enviroment";
import { LoggerService } from "./infrastructure/logger";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

export class Application {
  private server!: INestApplication;
  private enviromentService!: EnviromentService;
  private loggerService!: LoggerService;
  private globalPrefix = 'api';

  private async setApplication(): Promise<void> {
    this.server = await NestFactory.create(AppModule);
    this.enviromentService = this.server.get(EnviromentService);
    this.loggerService = this.server.get(LoggerService);
  }

  private async setGlobalScopes(): Promise<void> {
    this.server.setGlobalPrefix(this.globalPrefix);
    this.server.useGlobalPipes(new ValidationPipe);

    this.server.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    this.server.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });
  }

  async start(): Promise<void> {
    await this.setApplication();
    this.setGlobalScopes();
    const port = this.enviromentService.get("APP_PORT");

    await this.server
      .listen(port!)
      .then(() => {
        this.loggerService.info(`🚀 ${this.constructor.name} running  http://localhost:${port}/${this.globalPrefix}`);
      })
      .catch((error) => {
        this.loggerService.error(
          `${this.constructor.name} Error starting: ${error}`,
        );
        process.exit(1);
      });
  }
}
