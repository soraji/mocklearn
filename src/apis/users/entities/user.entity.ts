import { ImageUser } from 'src/apis/imageUser/entities/imageUser.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

export enum USER_ENUM {
  'T' = 'TEACHER',
  'S' = 'STUDENT'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: USER_ENUM })
  role: string;

  @Column({ default: 0 })
  paid: number;

  @JoinColumn()
  @OneToOne(() => ImageUser)
  imageUser: ImageUser;
}
