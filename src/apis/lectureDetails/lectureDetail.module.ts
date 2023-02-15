import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureDetail } from './entities/lectureDetail.entity';
import { LectureDetailController } from './lectureDetail.controller';
import { LectureDetailService } from './lectureDetail.service';

@Module({
  imports: [TypeOrmModule.forFeature([LectureDetail])],
  providers: [LectureDetailService],
  controllers:[LectureDetailController]
})
export class LectureDetailsModule {}
