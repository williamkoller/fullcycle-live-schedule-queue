import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('emails')
export class SendMailWithTweetsJob {
  private logger = new Logger(SendMailWithTweetsJob.name);
  @Process()
  handle(job: Job) {
    this.logger.log(`${JSON.stringify(job.data)}`);
  }
}
