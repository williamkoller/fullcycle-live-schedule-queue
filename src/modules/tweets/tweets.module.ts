import { CacheModule, Module } from '@nestjs/common';
import { TweetsService } from '@/modules/tweets/services/tweets/tweets.service';
import { TweetsController } from './controllers/tweets.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tweet } from './entities/tweet.entity';
import { TweetsCountService } from './services/tweets-count/tweets-count.service';
import { BullModule } from '@nestjs/bull'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    CacheModule.register(),
    SequelizeModule.forFeature([Tweet]),
    BullModule.registerQueueAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'emails',
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get<string>('hostRedis'),
          port: +config.get<number>('portRedis')
        }
      })
    })
  ],
  controllers: [TweetsController],
  providers: [TweetsService, TweetsCountService],
})
export class TweetsModule {}
