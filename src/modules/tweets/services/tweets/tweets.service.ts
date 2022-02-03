import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTweetDto } from '@/modules/tweets/dto/create-tweet.dto';
import { UpdateTweetDto } from '@/modules/tweets/dto/update-tweet.dto';
import { Tweet } from '@/modules/tweets/entities/tweet.entity';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet)
    private readonly tweetsRepository: typeof Tweet,
  ) {}
  async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
    return await this.tweetsRepository.create<Tweet>(createTweetDto);
  }

  async findAll(): Promise<Tweet[]> {
    return await this.tweetsRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} tweet`;
  }

  update(id: number, updateTweetDto: UpdateTweetDto) {
    return `This action updates a #${id} tweet`;
  }

  remove(id: number) {
    return `This action removes a #${id} tweet`;
  }
}
