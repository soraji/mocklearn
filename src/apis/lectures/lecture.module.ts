import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureCategory } from '../categories/entities/category.entity';
import { Lecture } from './entities/lecture.entity';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture,LectureCategory])],
  providers: [LectureService],
  controllers:[LectureController]
})
export class LecturesModule {}
