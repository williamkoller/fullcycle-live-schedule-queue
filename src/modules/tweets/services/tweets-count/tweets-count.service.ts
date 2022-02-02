import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Cache } from 'cache-manager';
import { Tweet } from '../../entities/tweet.entity';

@Injectable()
export class TweetsCountService {
  private logger = new Logger(TweetsCountService.name);
  private limit = 10;
  private TEN_MINUTES = 1 * 60 * 10;
  constructor(
    @InjectModel(Tweet)
    private readonly tweetsRepository: typeof Tweet,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
  @Interval(5000)
  async countTweets() {
    let offset = await this.cacheManager.get<number>('tweet-offset');

    offset = offset === undefined ? 0 : offset;

    this.logger.log(`offset ${offset}`);

    const countTweets = await this.tweetsRepository.findAll({
      offset,
      limit: this.limit,
    });

    this.logger.log(`${countTweets.length} found`);

    if (countTweets.length === this.limit) {
      this.cacheManager.set('tweet-offset', offset + this.limit, {
        ttl: this.TEN_MINUTES,
      });
    }

    this.logger.log(`found ${this.limit} tweets`);
  }
}
