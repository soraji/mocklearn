import { Lecture } from 'src/apis/lectures/entities/lecture.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity()
export class ImageMainLecture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

}
