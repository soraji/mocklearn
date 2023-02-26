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

# Service Layer

- categories <카테고리>

  - 카테고리 선 등록 후 강의 생성 시 카테고리를 함께 등록

<br>

- curriculum <커리큘럼>

  - 강의 생성 시 자동 저장

<br>

- imageDetailLecture <강의 상세페이지 이미지>

  - AWS S3버킷에 이미지 배열로 등록

<br>

- imagemainLecture <강의 썸네일 이미지>

  - AWS S3버킷에 강의 썸네일 이지미 단일 등록

<br>

- imageUser <유저 이미지>

  - AWS S3버킷에 유저 이미지 단일 등록

<br>

- lectureDetails <상세페이지>

  - 강의 생성 시 자동 저장

<br>

- lectures <강의>

  - 강의 등록

    - TEACHER 권한을 가진 회원만 강의 등록 가능

    - 카테고리 입력 필수

    - 썸네일 이미지 등록 필수

    - 입력된 태그가 존재하면 등록

    - 강의 상세 테이블에 자동 저장

    - 커리큘럼 테이블에 자동 저장

    - 모든 내용을 합쳐 강의 테이블에 저장

    - 입력된 상세페이지 이미지가 존재하면 등록

  - 강의 수정

    - 강의를 등록한 TEACHER만 수정 가능

    * 입력된 메인 이미지가 있다면 기존의 이미지 id를 찾아 삭제 후 새로운 url 저장

    * 입력된 디테일 이미지가 있다면 기존의 이미지 id를 찾아 삭제 후 새로운 url 저장

    * 변경된 이미지와 함께 모든 입력된 내용으로 강의 테이블 업데이트

  - 강의 삭제

    - 강의와 연관된 모든 상세이미지, 강의와 연관된 모든 수강평 전체 삭제 후 강의 삭제

    - 강의와 연관된 커리큘럼, 썸네일 이미지, 상세페이지 삭제

<br>

- review <수강평>

  - 수강평은 회원당 1개만 작성 가능

<br>

- users <회원>

  - 암호화 과정을 통해 비밀번호 저장

  - 입력된 유저 이미지가 있다면 등록

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
