import { classToPlain, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { LectureCategory } from 'src/apis/categories/entities/category.entity';
import { Curriculum } from 'src/apis/curriculum/entities/curriculum.entity';
import { ImageDetailLecture } from 'src/apis/imageDetailLecture/entities/imageDetailLecture.entity';
import { ImageMainLecture } from 'src/apis/imageMainLecture/entities/imageMainLecture.entity';
import { LectureDetail } from 'src/apis/lectureDetails/entities/lectureDetail.entity';
import { LectureTag } from 'src/apis/lectureTags/entities/lectureTag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany
} from 'typeorm';
import { User } from 'src/apis/users/entities/user.entity';

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  price: string;

  @Column({ default: '0' })
  star: string;

  @Column({ default: 0 })
  reviewCount: number;

  @ManyToOne(() => LectureCategory)
  lectureCategory: LectureCategory;

  @ManyToOne(() => User)
  user: User;

  @JoinColumn()
  @OneToOne(() => Curriculum)
  curriculum: Curriculum;

  @JoinColumn()
  @OneToOne(() => LectureDetail)
  lectureDetail: LectureDetail;

  @JoinColumn()
  @OneToOne(() => ImageMainLecture)
  imageMainLecture: ImageMainLecture;

  @JoinColumn()
  @OneToMany(
    () => ImageDetailLecture,
    imageDetailLecture => imageDetailLecture.lecture
  )
  imageDetailLecture: ImageDetailLecture[];

  @JoinTable()
  @ManyToMany(() => LectureTag, lectureTags => lectureTags.lectures)
  lectureTags: LectureTag[];
}
