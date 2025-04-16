import { INestApplication, ValidationPipe, VersioningType } from "@nestjs/common";
import { EnviromentService } from "./infrastructure/enviroment";
import { LoggerService } from "./infrastructure/logger";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { UnauthorizedExceptionFilter } from "./infrastructure/filters/unauthorized-exception/unauthorized-exception.filter";
import { BaseRequestInterceptor, BaseResponseInterceptor } from "./infrastructure/interceptors";
import { TraceService } from "./infrastructure/trace";
import { NotificationService } from "./infrastructure/notification";
import { JwtGuard } from "./infrastructure/jwt";
import { JwtService } from "@nestjs/jwt";

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
    const traceService = this.server.get(TraceService);
    const notificationService = this.server.get(NotificationService);
    const jwtService = this.server.get(JwtService);
    const reflector = this.server.get(Reflector);

    this.server.setGlobalPrefix(this.globalPrefix);
    this.server.useGlobalPipes(new ValidationPipe());
    this.server.useGlobalFilters(new UnauthorizedExceptionFilter(this.loggerService));

    this.server.useGlobalGuards(new JwtGuard(jwtService, reflector, this.enviromentService));

    this.server.useGlobalInterceptors(new BaseRequestInterceptor(traceService));
    this.server.useGlobalInterceptors(new BaseResponseInterceptor(notificationService));

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
    const port = this.enviromentService.get("PORT");

    await this.server
      .listen(port!)
      .then(() => {
        this.loggerService.info(`🚀  ${this.constructor.name} running  http://localhost:${port}/${this.globalPrefix}`);
      })
      .catch((error) => {
        this.loggerService.error(
          `${this.constructor.name} Error starting: ${error}`,
        );
        process.exit(1);
      });
  }
}
