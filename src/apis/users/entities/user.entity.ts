import { classToPlain, Exclude } from 'class-transformer';
import { ImageUser } from 'src/apis/imageUser/entities/imageUser.entity';
import { Lecture } from 'src/apis/lectures/entities/lecture.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
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

  @Exclude({ toPlainOnly: true })
  // @Column({ select: false })
  @Column()
  password: string;

  @Column({ type: 'enum', enum: USER_ENUM })
  role: string;

  @Column({ default: 0 })
  paid: number;

  @JoinColumn()
  @OneToOne(() => ImageUser)
  imageUser: ImageUser;

  @JoinColumn()
  @OneToMany(() => Lecture, Lecture => Lecture.user)
  Lecture: Lecture;

  toJSON() {
    return classToPlain(this);
  }
}
