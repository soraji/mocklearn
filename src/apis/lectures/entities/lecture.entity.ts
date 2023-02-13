import { LectureCategory } from 'src/apis/categories/entities/category.entity';
import { LectureTag } from 'src/apis/lectureTags/entities/lectureTag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity()
export class Lecture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  teacher: string;

  @Column()
  price: string;

  @Column()
  star: string;

  @Column()
  imgurl: string;

  @Column()
  reviewCount: number;

  @ManyToOne(() => LectureCategory)
  lectureCategory: LectureCategory;

  @JoinTable()
  @ManyToMany(() => LectureTag, (lectureTags) => lectureTags.lectures)
  lectureTags: LectureTag[];
}
