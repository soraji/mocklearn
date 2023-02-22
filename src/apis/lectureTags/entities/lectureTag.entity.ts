import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Lecture } from '../../lectures/entities/lecture.entity';

@Entity()
export class LectureTag {
  @PrimaryGeneratedColumn('uuid')
  tag_id: string;

  @Column({ nullable: true })
  tag: string;

  @JoinTable()
  @ManyToMany(() => Lecture, lectures => lectures.lectureTags)
  lectures: Lecture[];
}
