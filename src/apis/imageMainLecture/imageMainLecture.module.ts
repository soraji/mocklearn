import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageMainLecture } from './entities/imageMainLecture.entity';
import { ImageMainLectureController } from './imageMainLecture.controller';
import { ImageMainLectureService } from './imageMainLecture.service';


@Module({
  imports: [TypeOrmModule.forFeature([ImageMainLecture])],
  controllers: [ImageMainLectureController],
  providers: [ImageMainLectureService],
  exports: [ImageMainLectureService],
})
export class ImageMainLectureModule {}