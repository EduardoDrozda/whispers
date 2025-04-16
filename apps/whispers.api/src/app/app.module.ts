import { Module } from '@nestjs/common';
import { EnviromentModule } from './infrastructure/enviroment';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { NotificationModule } from './infrastructure/notification';
import { ApiModule } from './api/api.module';

@Module({
  imports: [EnviromentModule, LoggerModule, NotificationModule, ApiModule]
})
export class AppModule {}
