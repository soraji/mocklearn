import { Lecture } from 'src/apis/lectures/entities/lecture.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImageDetailLecture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  url: string;

  @ManyToOne(() => Lecture)
  lecture: Lecture;
}
