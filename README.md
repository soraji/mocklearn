# Description

[인프런](https://www.inflearn.com/) 사이트를 mocking한 개인 프로젝트 모크런입니다 ˚ ₊ ෆ꒰◍ᐡᐤᐡ◍꒱

<br>

'내가 만약 인프런 같은 서비스를 만든다면 어떻게 만들까? 🧐' 라는 생각에서 시작하게 되었습니다 : )

<br>

<br>

# Stack

- NestJS
- TypeSrcipt
- PM2
- MySQL
- AWS EC2, S3, RDS, Route53
- Jest
- Swagger

<br>

<br>

# Context

## ■ 문제 상황

### Business

---

- 강의, 카테고리, 이미지 등록, 수정, 삭제는 선생님 권한을 가진 유저만 가능합니다.
- 강의, 수강평, 카테고리 조회는 모두가 접근 가능합니다.
- 수강평은 강의를 구매한 학생에 한해 1회 작성만 가능합니다.
- 회원가입을 할 때 유저 이미지를 선택할 수 있습니다.

### Tech

---

- REST API로 구현하고 어플리케이션 설명을 위해 Swagger를 작성합니다.
- 새로운 기능을 추가하기 쉽도록 확장 가능한 모듈 아키텍처로 개발합니다.
- 이미지 등록은 클라우드 서비스에 합니다.
- 회원가입을 할 때 비밀번호는 암호화 과정을 통해 저장합니다.
  - 이메일과 비밀번호로 인증합니다.
  - 회원가입을 할 때 이름, 이메일, 핸드폰, 비밀번호, 역할은 필수값입니다.
  - 회원가입을 할 때 ‘TEACHER’ 혹은 ‘STUDENT’를 선택할 수 있습니다.
- 강의 등록은 ‘TEACHER’ 인가를 받은 유저만 가능합니다.
  - 강의 등록을 할 때 필수값인 ‘카테고리’, ‘대표이미지’, ‘강의 정보(제목, 등록자이름, 가격)’를 입력해야 합니다.
- AWS 로 배포 후 도메인을 적용합니다.

<br>

<br>

## ■ 구체화 및 해결방안

---

- Node.js 프레임워크인 NestJS를 이용하여 확장이 쉬운 아키텍처로 만들어야겠다고 판단
  - Controller에서 REST API 제작
  - @nestjs/swagger 를 이용하여 편하게 Swagger 작성
  - TypeORM을 이용하여 DB와 연결
- GCP Bucket경험이 있어 이미지 클라우드 저장소로 AWS S3을 채택
- 회원가입시 ENUM으로 ‘TEACHER’ 혹은 ‘STUDENT’ 역할 선택. bcrypt를 이용한 비밀번호 암호화
- JWT를 이용하여 로그인 프로세스 구현. 일반 유저 or TEACHER 인가(Authorization) 처리
- 강의 목록에서 강의의 모든 데이터를 가져오는게 비효율적이라 판단
  - 강의 목록에는 대표이미지, 강의명, 강사명, 가격, 찜 개수 데이터만 보여주면 되므로 강의 테이블에는 해당 정보만 입력
  - 강의 테이블과 강의 상세 테이블을 구분하여 1:1관계로 설정 후 상세페이지에 들어갔을 때 강의 상세 페이지를 사용하는 것으로 구현
- AWS의 RDS(MySQL)와 EC2, Route53 을 이용해 Linux에서 PM2로 어플리케이션 배포 & 도메인 적용
  - VPC로 RDS와 EC2 피어링
  - AWS 프리티어 스토리지 용량 문제로 로컬에서 빌드 후 빌드된 폴더도 git에 함께 커밋
  - Linux에서 PM2 실행을 위해 package.json에 PM2 명령어 설정
  - AWS Route53 으로 도메인 적용

<br>

<br>

# Swagger

http://mocklearn.shop:3000/api-docs

<br>

<img width="1475" alt="스크린샷 2023-02-23 오후 1 15 55" src="https://user-images.githubusercontent.com/40020413/220820259-afde968d-9a81-48e1-beac-60d935843957.png">

<br>

<br>

# ERD

https://www.erdcloud.com/d/vy74tce9trxBGQe4q

<br>

<img width="1826" alt="스크린샷 2023-02-22 오후 6 25 51" src="https://user-images.githubusercontent.com/40020413/220578250-7f701514-26ff-41b3-9166-f394d271eb6b.png">

<br>

<br>

# Directory

<br>

```
📦 mocklearn
 ┣ 📂 src
 ┃ ┣ 📂 apis
 ┃ ┃ ┣ 📂 auth
 ┃ ┃ ┃ ┣ 📂 interfaces
 ┃ ┃ ┃ ┃ ┗ 📜 auth-service.interface.ts
 ┃ ┃ ┃ ┣ 📜 auth.controller.ts
 ┃ ┃ ┃ ┣ 📜 auth.module.ts
 ┃ ┃ ┃ ┗ 📜 auth.service.ts
 ┃ ┃ ┣ 📂 categories
 ┃ ┃ ┃ ┣ 📂 entities
 ┃ ┃ ┃ ┃ ┗ 📜 category.entity.ts
 ┃ ┃ ┃ ┣ 📜 category.controller.ts
 ┃ ┃ ┃ ┣ 📜 category.module.ts
 ┃ ┃ ┃ ┗ 📜 category.service.ts
 ┃ ┃ ┣ 📂 curriculum
 ┃ ┃ ┃ ┗ 📂 entities
 ┃ ┃ ┃ ┃ ┗ 📜 curriculum.entity.ts
 ┃ ┃ ┣ 📂 iamport
 ┃ ┃ ┃ ┗ 📜 iamport.service.ts
 ┃ ┃ ┣ 📂 imageDetailLecture
 ┃ ┃ ┃ ┣ 📂 entities
 ┃ ┃ ┃ ┃ ┗ 📜 imageDetailLecture.entity.ts
 ┃ ┃ ┃ ┣ 📜 imageDetailLecture.controller.ts
 ┃ ┃ ┃ ┣ 📜 imageDetailLecture.module.ts
 ┃ ┃ ┃ ┗ 📜 imageDetailLecture.service.ts
 ┃ ┃ ┣ 📂 imageMainLecture
 ┃ ┃ ┃ ┣ 📂 entities
 ┃ ┃ ┃ ┃ ┗ 📜 imageMainLecture.entity.ts
 ┃ ┃ ┃ ┣ 📜 imageMainLecture.controller.ts
 ┃ ┃ ┃ ┣ 📜 imageMainLecture.module.ts
 ┃ ┃ ┃ ┗ 📜 imageMainLecture.service.ts
 ┃ ┃ ┣ 📂 imageUser
 ┃ ┃ ┃ ┣ 📂 entities
 ┃ ┃ ┃ ┃ ┗ 📜 imageUser.entity.ts
 ┃ ┃ ┃ ┣ 📜 imageUser.controller.ts
 ┃ ┃ ┃ ┣ 📜 imageUser.module.ts
 ┃ ┃ ┃ ┗ 📜 imageUser.service.ts
 ┃ ┃ ┣ 📂 lectureDetails
 ┃ ┃ ┃ ┗ 📂 entities
 ┃ ┃ ┃ ┃ ┗ 📜 lectureDetail.entity.ts
 ┃ ┃ ┣ 📂 lectureTags
 ┃ ┃ ┃ ┗ 📂 entities
 ┃ ┃ ┃ ┃ ┗ 📜 lectureTag.entity.ts
 ┃ ┃ ┣ 📂 lectures
 ┃ ┃ ┃ ┣ 📂 __test__
 ┃ ┃ ┃ ┃ ┗ 📜 lecture.service.spec.ts
 ┃ ┃ ┃ ┣ 📂 dto
 ┃ ┃ ┃ ┃ ┣ 📜 create-lecture.dto.ts
 ┃ ┃ ┃ ┃ ┗ 📜 update-lecture.dto.ts
 ┃ ┃ ┃ ┣ 📂 entities
 ┃ ┃ ┃ ┃ ┗ 📜 lecture.entity.ts
 ┃ ┃ ┃ ┣ 📜 lecture.controller.ts
 ┃ ┃ ┃ ┣ 📜 lecture.module.ts
 ┃ ┃ ┃ ┗ 📜 lecture.service.ts
 ┃ ┃ ┣ 📂 payments
 ┃ ┃ ┃ ┣ 📂 entities
 ┃ ┃ ┃ ┃ ┗ 📜 payment.entity.ts
 ┃ ┃ ┃ ┣ 📂 interface
 ┃ ┃ ┃ ┃ ┗ 📜 payment-service.interface.ts
 ┃ ┃ ┃ ┣ 📜 payment.controller.ts
 ┃ ┃ ┃ ┣ 📜 payment.module.ts
 ┃ ┃ ┃ ┣ 📜 payment.service-graphql.ts
 ┃ ┃ ┃ ┗ 📜 payment.service.ts
 ┃ ┃ ┣ 📂 review
 ┃ ┃ ┃ ┣ 📂 dto
 ┃ ┃ ┃ ┃ ┣ 📜 create-review.dto.ts
 ┃ ┃ ┃ ┃ ┗ 📜 update-review.dto.ts
 ┃ ┃ ┃ ┣ 📂 entities
 ┃ ┃ ┃ ┃ ┗ 📜 review.entity.ts
 ┃ ┃ ┃ ┣ 📜 review.controller.ts
 ┃ ┃ ┃ ┣ 📜 review.module.ts
 ┃ ┃ ┃ ┗ 📜 review.service.ts
 ┃ ┃ ┗ 📂 users
 ┃ ┃ ┃ ┣ 📂 __test__
 ┃ ┃ ┃ ┃ ┣ 📜 user.resolver.spec.ts
 ┃ ┃ ┃ ┃ ┗ 📜 user.service.spec.ts
 ┃ ┃ ┃ ┣ 📂 dto
 ┃ ┃ ┃ ┃ ┣ 📜 create-user.dto.ts
 ┃ ┃ ┃ ┃ ┗ 📜 update-user.dto.ts
 ┃ ┃ ┃ ┣ 📂 entities
 ┃ ┃ ┃ ┃ ┗ 📜 user.entity.ts
 ┃ ┃ ┃ ┣ 📜 user.controller.ts
 ┃ ┃ ┃ ┣ 📜 user.module.ts
 ┃ ┃ ┃ ┗ 📜 user.service.ts
 ┃ ┣ 📂 common
 ┃ ┃ ┣ 📂 auth
 ┃ ┃ ┃ ┣ 📜 auth.guard.ts
 ┃ ┃ ┃ ┣ 📜 jwt-access.strategy.ts
 ┃ ┃ ┃ ┣ 📜 jwt-refresh.strategy.ts
 ┃ ┃ ┃ ┣ 📜 jwt-social-google.strategy.ts
 ┃ ┃ ┃ ┣ 📜 jwt-social-kakao.strategy.ts
 ┃ ┃ ┃ ┣ 📜 jwt-social-naver.strategy.ts
 ┃ ┃ ┃ ┗ 📜 jwt-teacher.strategy.ts
 ┃ ┃ ┗ 📂 types
 ┃ ┃ ┃ ┗ 📜 context.ts
 ┃ ┣ 📂 util
 ┃ ┃ ┗ 📜 swagger.ts
 ┃ ┣ 📜 app.controller.ts
 ┃ ┣ 📜 app.module.ts
 ┃ ┗ 📜 main.ts
 ┣ 📂 test
 ┃ ┣ 📜 app.e2e-spec.ts
 ┃ ┗ 📜 jest-e2e.json
 ┣ 📜 .env
 ┣ 📜 .gitignore
 ┣ 📜 .prettierrc
 ┣ 📜 README.md
 ┣ 📜 nest-cli.json
 ┣ 📜 package.json
 ┣ 📜 tsconfig.build.json
 ┣ 📜 tsconfig.json
 ┗ 📜 yarn.lock
```
