import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum USER_ENUM {
  'T' = 'TEACHER',
  'S' = 'STUDENT',
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

  @Column()
  password: string;

  @Column({ type: 'enum', enum: USER_ENUM })
  role: string;

  @Column()
  paid:number
}
