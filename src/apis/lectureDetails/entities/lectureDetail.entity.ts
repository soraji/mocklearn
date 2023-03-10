import { LectureCategory } from 'src/apis/categories/entities/category.entity';
import { Lecture } from 'src/apis/lectures/entities/lecture.entity';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne
} from 'typeorm';

export enum LEVEL_ENUM {
  'BEGINNER' = 'BEGINNER',
  'INTERMEDIATE' = 'INTERMEDIATE',
  'ADVANCED' = 'ADVANCED'
}

@Entity()
export class LectureDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  many: number;

  @Column({ default: '9999-01-01' })
  expire: Date;

  @Column({ type: 'enum', enum: LEVEL_ENUM })
  level: string;

  @Column({ type: 'longtext', nullable: true })
  description: string;
}
