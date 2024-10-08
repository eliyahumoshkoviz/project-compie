import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule } from './logger/logger.module';
import { AppConfigModule } from '../config/app-config.module';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { ApiCommunicationManagerModule } from './api-communication-manager/api-communication-manager.module';
import { AllExceptionsFilter } from './exceptions/all-exception.filter';
import { HttpExceptionsFilter } from './exceptions/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  imports: [
    LoggerModule,
    AppConfigModule,
    ApiCommunicationManagerModule,
    HttpModule.register({}),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
  exports: [ApiCommunicationManagerModule, AppConfigModule, LoggerModule],
})
export class CoreModule {}
