import { Module } from '@nestjs/common';
import { EnviromentModule } from './infrastructure/enviroment';
import { LoggerModule } from './infrastructure/logger/logger.module';

@Module({
  imports: [EnviromentModule, LoggerModule]
})
export class AppModule {}
