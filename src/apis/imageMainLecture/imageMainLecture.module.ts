import { Module } from '@nestjs/common';
import { ImageMainLectureController } from './imageMainLecture.controller';
import { ImageMainLectureService } from './imageMainLecture.service';


@Module({
  controllers: [ImageMainLectureController],
  providers: [ImageMainLectureService],
  exports: [ImageMainLectureService],
})
export class ImageMainLectureModule {}