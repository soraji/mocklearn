import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from '../lectures/entities/lecture.entity';
import { User } from '../users/entities/user.entity';
import { Review } from './entities/review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Lecture, User])],
  providers: [ReviewService],
  controllers: [ReviewController]
})
export class ReviewModule {}
