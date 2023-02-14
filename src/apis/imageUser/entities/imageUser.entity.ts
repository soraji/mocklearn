import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity()
export class ImageUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;
}
