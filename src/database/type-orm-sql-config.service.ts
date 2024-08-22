import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import databaseConfig from '../config/database.config';

@Injectable()
export class TypeOrmSqlConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(databaseConfig.KEY)
    private readonly databaseConfigModel: ConfigType<typeof databaseConfig>,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      synchronize: false,
      logging: process.env.LOG_LEVEL === 'debug',
      host: this.databaseConfigModel.host,
      port: this.databaseConfigModel.port,
      username: this.databaseConfigModel.username,
      password: this.databaseConfigModel.password,
      database: this.databaseConfigModel.schema,
      entities: [`${__dirname} + /../**/*.entity{.ts,.js}`],
      trace: true,
    };
  }
}
