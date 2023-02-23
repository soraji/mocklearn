import { ApiProperty } from '@nestjs/swagger';
import { LEVEL_ENUM } from 'src/apis/lectureDetails/entities/lectureDetail.entity';

export class CreateLectureInput {
  @ApiProperty({
    description: '강의 제목',
    example: 'Jenkins를 이용한 CI/CD Pipeline 구축'
  })
  title: string;

  @ApiProperty({ description: '지식공유자', example: '지식공유자' })
  teacher: string;

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
    description: '강의 상세페이지 설명',
    example:
      '초급자를 위해 준비한 [데브옵스 · 인프라, 백엔드] 강의입니다. 본 강의는 클라우드 네이티브 애플리케이션을 구성하는 4가지 핵심 요소(MSA, CI/CD, DevOps, Container) 중 하나인 CI(Continuous Integration, 지속적인 통합)과 CD(Continuous Deployment, 지속적인 배포) 파이프라인에 대한 다루는 강의입니다. 본 강의를 통해 CI/CD 도구인 Jenkins를 이용하여 로컬 환경과 클라우드 환경에 자신만의 자동화 파이프라인을 구축하고, 배포하는 데에 필요한 과정을 이해하고 실습해 볼 수 있습니다.'
  })
  description: string;

  @ApiProperty({
    description: '난이도',
    example: 'BEGINNER | INTERMEDIATE | ADVANCED'
  })
  level: LEVEL_ENUM;

  @ApiProperty({
    description: '상세페이지 이미지',
    example: [
      'https://sorasample-bucket.s3.ap-northeast-2.amazonaws.com/image/detail/1676988855368-detail001.jpeg',
      'https://sorasample-bucket.s3.ap-northeast-2.amazonaws.com/image/detail/1676988855371-detail002.jpeg'
    ]
  })
  imageDetailLecture: string[];

  @ApiProperty({
    description: '커리큘럼 섹션',
    example:
      '섹션 0. 과정 및 강의 내용 소개,섹션 1. DevOps와 CI/CD의 이해,섹션 2. Jenkins를 이용한 CI/CD 자동화 도구의 사용,섹션 3. Jenkins + Infrastructure as Code 와의 연동'
  })
  section: string[];

  @ApiProperty({
    description: '커리큘럼 섹션 안 세부목록',
    example:
      '과정소개,Waterfall vs Agile,Cloud Native Application의 구성요소,CI/CD 자동화 도구의 이해,CI/CD Work flow,Infrastructure as Code 개요와 Ansible의 이해,Docker 컨테이너로 Ansible 실행하기'
  })
  content: string[];

  @ApiProperty({ description: '강의 태그', example: '["#젠킨스","#CI/CD"]' })
  lectureTags: string[];
}
