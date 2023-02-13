import { Lecture } from 'src/apis/lectures/entities/lecture.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';


@Entity()
export class LectureTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  tag: string;

  @ManyToMany(() => Lecture, (lectures) => lectures.lectureTags)
  lectures: Lecture[];
}
