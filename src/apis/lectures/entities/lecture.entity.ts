import { LectureCategory } from 'src/apis/categories/entities/category.entity';
import {
  Column,
  Entity,
  ManyToOne,
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

  @ManyToOne(() => LectureCategory)
  lectureCategory: LectureCategory;
}
