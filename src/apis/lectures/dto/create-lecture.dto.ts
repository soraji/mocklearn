import { ApiProperty } from '@nestjs/swagger';
import { LEVEL_ENUM } from 'src/apis/lectureDetails/entities/lectureDetail.entity';

export class CreateLectureInput {
  @ApiProperty({
    description: '강의 제목',
    example: '강의 제목을 작성해주세요'
  })
  title: string;

  @ApiProperty({ description: '가격', example: 55000 })
  price: number;

  @ApiProperty({
    description: '대표 이미지 url',
    example:
      'https://sorasample-bucket.s3.ap-northeast-2.amazonaws.com/image/main/1677134022685-jenkins.png'
  })
  imageMainUrl: string;

  @ApiProperty({
    description: '카테고리 아이디',
    example: '1c3bb49c-d692-4bbb-b953-fe51470e9c43'
  })
  lectureCategoryId: string;

  //세부정보 입력
  @ApiProperty({
    nullable: true,
    description: '강의 상세페이지 설명',
    example: '강의 상세 내용을 적어주세요'
  })
  description: string;

  @ApiProperty({
    description: '난이도',
    example: 'BEGINNER | INTERMEDIATE | ADVANCED 중 하나를 골라주세요'
  })
  level: LEVEL_ENUM;

  @ApiProperty({
    nullable: true,
    description: '상세페이지 이미지',
    example: [
      'https://sorasample-bucket.s3.ap-northeast-2.amazonaws.com/image/detail/1676988855368-detail001.jpeg',
      'https://sorasample-bucket.s3.ap-northeast-2.amazonaws.com/image/detail/1676988855371-detail002.jpeg'
    ]
  })
  imageDetailLecture: string[];

  @ApiProperty({
    nullable: true,
    description: '커리큘럼 섹션',
    example: [
      '섹션 0. 대제목1',
      '섹션 1. 대제목2',
      '섹션 2. 대제목3',
      '섹션 3. 대제목4'
    ]
  })
  section: string[];

  @ApiProperty({
    nullable: true,
    description: '커리큘럼 섹션 안 세부목록',
    example: [
      '섹션0에 들어가는 소제목1',
      '섹션0에 들어가는 소제목2',
      '섹션0에 들어가는 소제목3',
      '섹션1에 들어가는 소제목1',
      '섹션1에 들어가는 소제목2',
      '섹션1에 들어가는 소제목3',
      '섹션2에 들어가는 소제목1',
      '섹션2에 들어가는 소제목2',
      '섹션3에 들어가는 소제목1',
      '섹션3에 들어가는 소제목2'
    ]
  })
  content: string[];

  @ApiProperty({
    nullable: true,
    description: '강의 태그',
    example: '["#젠킨스","#CI/CD"]'
  })
  lectureTags: string[];
}
