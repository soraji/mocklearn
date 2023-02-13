import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity()
export class LectureCategory {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: '아이디' })
  id: string;

  @Column({default:''})
  @ApiProperty({ description: '카테고리명' })
  name: string;
}
