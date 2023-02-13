import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum POINT_TRANSACTION_STATUS_ENUM  {//고정된 상수값을 type으로 저장해놓는것(PointTransaction안의 status에 있는 enum이다)
  PAYMENT = "PAYMENT",
  CANCEL = "CANCEL"
}
@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  payment_id: string;

  @Column()
  impUid:string

  @Column()
  amount:number

  @Column({default:""})
  membership:string

  @Column({ type: "enum", enum : POINT_TRANSACTION_STATUS_ENUM })
  status:string

  @Column({
    type: 'datetime',
    nullable: true,
  })
  available_date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @JoinColumn()
  @ManyToOne(() => User)
  user: User;
}
