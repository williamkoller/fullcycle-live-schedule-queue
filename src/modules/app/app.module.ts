import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envFolderPath, { environments } from '@/config/environments';
import { SequelizeModule } from '@nestjs/sequelize';
import { TweetsModule } from '../tweets/tweets.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'api_db',
      username: 'root',
      password: 'root',
      database: 'fullcycle_live_schedule_queue_db',
      port: 5432,
      autoLoadModels: true,
      synchronize: true,
    }),
    TweetsModule,
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
