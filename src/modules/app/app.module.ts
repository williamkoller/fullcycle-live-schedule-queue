import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envFolderPath, { environments } from '@/config/environments';
import { SequelizeModule } from '@nestjs/sequelize';
import { TweetsModule } from '../tweets/tweets.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull'
import { MainlingModule } from '../mainling/mainling.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get<string>('host'),
        username: config.get<string>('username'),
        password: config.get<string>('password'),
        database: config.get<string>('database'),
        port: config.get<number>('portPostgres'),
        autoLoadModels: true,
        synchronize: true,
        logging: false,
      })
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get<string>('hostRedis'),
          port: +config.get<number>('portRedis')
        }
      })
    }),
    forwardRef(() => TweetsModule),
    forwardRef(() => MainlingModule),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFolderPath.folderPath,
      load: [environments],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
