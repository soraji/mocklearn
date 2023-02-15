import { LectureCategory } from 'src/apis/categories/entities/category.entity';
import { Lecture } from 'src/apis/lectures/entities/lecture.entity';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

export enum LEVEL_ENUM  {
  'BEGINNER' = 'BEGINNER',
  'INTERMEDIATE' = 'INTERMEDIATE',
  'ADVANCED' = 'ADVANCED'
}

@Entity()
export class LectureDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  many: number;

  @Column()
  expire: Date;

  @Column({ type: 'enum', enum: LEVEL_ENUM })
  level: string;

  @Column()
  description: string;

  @JoinColumn()
  @OneToOne(() => Lecture)
  lecture: Lecture;
}
