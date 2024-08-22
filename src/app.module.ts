import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmSqlConfigService } from './database/type-orm-sql-config.service';
import { ExampleModule } from './modules/example/example.module';
import { HealthModule } from './modules/app/health/health.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './modules/users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AreasModule } from './modules/areas/areas.module';
const cookieSession = require('cookie-session')

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    CoreModule,
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useExisting: TypeOrmSqlConfigService,
    }),
    HealthModule,
    AppConfigModule,
    UsersModule,
    AreasModule,
    // ExampleModule,
  ],
  exports: [],
})
export class AppModule {
  constructor(private configService: ConfigService) { }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
