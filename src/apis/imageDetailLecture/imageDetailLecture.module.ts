import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageDetailLecture } from './entities/imageDetailLecture.entity';
import { ImageDetailLectureController } from './imageDetailLecture.controller';
import { ImageDetailLectureService } from './imageDetailLecture.service';


@Module({
  imports: [TypeOrmModule.forFeature([ImageDetailLecture])],
  controllers: [ImageDetailLectureController],
  providers: [ImageDetailLectureService],
  exports: [ImageDetailLectureService],
})
export class ImageDetailLectureModule {}