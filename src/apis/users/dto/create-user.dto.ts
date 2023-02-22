import { ApiProperty } from '@nestjs/swagger';
import { USER_ENUM } from '../entities/user.entity';

export class CreateUserInput {
  @ApiProperty({ description: '이름' })
  name: string;

  @ApiProperty({ description: '이메일' })
  email: string;

  @ApiProperty({ description: '핸드폰번호' })
  phone: string;

  @ApiProperty({ description: '비밀번호' })
  password: string;

  @ApiProperty({ description: '권한', example: 'TEACHER || STUDENT' })
  role: USER_ENUM;

  @ApiProperty({
    description: '사용자 이미지 url',
    example:
      'https://sorasample-bucket.s3.ap-northeast-2.amazonaws.com/image/user/1676353859021-pika.jpeg'
  })
  imageUser: string;
}
