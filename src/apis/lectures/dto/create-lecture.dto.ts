import { ApiProperty } from '@nestjs/swagger';
import { LEVEL_ENUM } from 'src/apis/lectureDetails/entities/lectureDetail.entity';

export class CreateLectureInput {
  @ApiProperty({ description: '강의 제목' })
  title: string;

  @ApiProperty({ description: '지식공유자' })
  price: number;

  @ApiProperty({ description: '가격' })
  teacher: string;

  @ApiProperty({ description: '강의 평점' })
  star: string;

  @ApiProperty({ description: '대표 이미지 url' })
  imageMainUrl: string;

  @ApiProperty({ description: '카테고리 아이디' })
  lectureCategoryId: string;

  //세부정보 입력
  @ApiProperty({ description: '강의 갯수' })
  many: string;

  @ApiProperty({ description: '수강 기간' })
  expire: string;

  @ApiProperty({ description: '강의 상세페이지 설명' })
  description: string;

  @ApiProperty({ description: '난이도' })
  level: LEVEL_ENUM;

  @ApiProperty({ description: '상세페이지 이미지' })
  imageDetailLecture: string[];

  @ApiProperty({ description: '커리큘럼 섹션' })
  section: string[];

  @ApiProperty({ description: '커리큘럼 섹션 안 세부목록' })
  content: string[];

  @ApiProperty({ description: '강의 태그' })
  lectureTags: string[];
}
