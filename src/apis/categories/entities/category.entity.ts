import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity()
export class LectureCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({default:''})
  name: string;
}
