import { CacheModule, Module } from '@nestjs/common';
import { TweetsService } from '@/modules/tweets/services/tweets/tweets.service';
import { TweetsController } from './controllers/tweets.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tweet } from './entities/tweet.entity';
import { TweetsCountService } from './services/tweets-count/tweets-count.service';

@Module({
  imports: [CacheModule.register(), SequelizeModule.forFeature([Tweet])],
  controllers: [TweetsController],
  providers: [TweetsService, TweetsCountService],
})
export class TweetsModule {}
