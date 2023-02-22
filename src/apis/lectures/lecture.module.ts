import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureCategory } from '../categories/entities/category.entity';
import { Curriculum } from '../curriculum/entities/curriculum.entity';
import { ImageDetailLecture } from '../imageDetailLecture/entities/imageDetailLecture.entity';
import { ImageMainLecture } from '../imageMainLecture/entities/imageMainLecture.entity';
import { LectureDetail } from '../lectureDetails/entities/lectureDetail.entity';
import { LectureTag } from '../lectureTags/entities/lectureTag.entity';
import { Review } from '../review/entities/review.entity';
import { Lecture } from './entities/lecture.entity';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Lecture,
      LectureCategory,
      ImageMainLecture,
      LectureDetail,
      ImageDetailLecture,
      Review,
      Curriculum,
      LectureTag
    ])
  ],
  providers: [LectureService],
  controllers: [LectureController]
})
export class LecturesModule {}
