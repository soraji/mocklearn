import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewInput {
  @ApiProperty({
    description: '강의ID',
    example: '369b7493-1f6f-41c6-9a0a-49d2a16cdd7b'
  })
  lectureId: string;

  @ApiProperty({ description: '평점', example: '4.6' })
  star: string;

  @ApiProperty({
    description: '수강평 내용',
    example: '너무 도움되는 강의였어요! 감사합니다!! '
  })
  content: string;
}
