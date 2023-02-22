import { Lecture } from 'src/apis/lectures/entities/lecture.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne
} from 'typeorm';

@Entity()
export class Curriculum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  section: string[];

  @Column('simple-array')
  content: string[];
}
