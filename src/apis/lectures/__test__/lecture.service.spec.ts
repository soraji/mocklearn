import {
  ConflictException,
  UnprocessableEntityException
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Curriculum } from 'src/apis/curriculum/entities/curriculum.entity';
import { ImageDetailLecture } from 'src/apis/imageDetailLecture/entities/imageDetailLecture.entity';
import { ImageMainLecture } from 'src/apis/imageMainLecture/entities/imageMainLecture.entity';
import { LectureDetail } from 'src/apis/lectureDetails/entities/lectureDetail.entity';
import { LectureTag } from 'src/apis/lectureTags/entities/lectureTag.entity';
import { Review } from 'src/apis/review/entities/review.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Lecture } from '../entities/lecture.entity';
import { LectureService } from '../lecture.service';

interface IUserfind {
  where: IId;
}
interface IId {
  id: string;
}
interface ICategoryfind {
  where: ICateId;
}
interface ICateId {
  category_id: string;
}
interface ITagfind {
  where: IId;
}

class MockUserRepository {
  users = [
    {
      id: 'A001',
      name: '선생',
      email: 'teacher@gmail.com',
      phone: '01023456789',
      hashedPassword: '1234',
      role: 'TEACHER'
    },
    {
      id: 'A002',
      name: '학생1',
      email: 'stu1@gmail.com',
      phone: '01022223333',
      hashedPassword: '1234',
      role: 'STUDENT'
    },
    {
      id: 'A003',
      name: '학생2',
      email: 'stu2@gmail.com',
      phone: '01055556666',
      hashedPassword: '1234',
      role: 'STUDENT'
    }
  ];

  findOne(param: IUserfind) {
    const user = this.users.filter(el => el.id === param?.where.id);
    if (user.length >= 1) return user[0];
    return null;
  }
}

class MockLectureCategoryRepository {
  lectureCategory = [
    {
      category_id: 'C001',
      name: '웹개발'
    },
    {
      category_id: 'C002',
      name: '보안'
    }
  ];

  findOne(param: ICategoryfind) {
    const cetegory = this.lectureCategory.filter(
      el => el.category_id === param?.where.category_id
    );
    if (cetegory.length >= 1) return cetegory[0];
    return null;
  }
}

class MockLectureRepository {
  lectures = [
    {
      title: 'test강의',
      teacher: '다알랴줌',
      price: 33000,
      imageMainUrl:
        'https://sorasample-bucket.s3.ap-northeast-2.amazonaws.com/image/main/1677134022685-jenkins.png',
      lectureCategoryId: 'C001',
      description: '상세내용',
      level: 'BEGINNER',
      imageDetailLecture: [
        'https://sorasample-bucket.s3.ap-northeast-2.amazonaws.com/image/detail/1676988855368-detail001.jpeg',
        'https://sorasample-bucket.s3.ap-northeast-2.amazonaws.com/image/detail/1676988855371-detail002.jpeg'
      ],
      section: 'test0,test1,test2,test3',
      content: 'test0,test1,test2,test3,test4,test5,test6',
      lectureTags: ['#test', '#test2']
    }
  ];

  save({
    title,
    teacher,
    price,
    imageMainUrl,
    lectureCategoryId,
    description,
    level,
    imageDetailLecture,
    section,
    content,
    lectureTags
  }) {
    this.lectures.push({
      title,
      teacher,
      price,
      imageMainUrl,
      lectureCategoryId,
      description,
      level,
      imageDetailLecture,
      section,
      content,
      lectureTags
    });
    return {
      title,
      teacher,
      price,
      imageMainUrl,
      lectureCategoryId,
      description,
      level,
      imageDetailLecture,
      section,
      content,
      lectureTags
    };
  }
}

class MockImageMainLectureRepository {
  lectureImg = [];
  save({ url }) {
    this.lectureImg.push({ url });
    return { url };
  }
}

class MockCurriculumRepository {
  curriculum = [];
  save({ section, content }) {
    this.curriculum.push({ section, content });
    return { section, content };
  }
}

class MockReviewRepository {}

class MockLectureTagRepository {
  lectureTags = [
    // {
    //   id: 'T001',
    //   name: 'test1'
    // },
    // {
    //   id: 'T002',
    //   name: 'test2'
    // }
  ];

  findOne(param: ITagfind) {
    const tag = this.lectureTags.filter(el => el.id === param?.where.id);
    if (tag.length >= 1) return tag[0];
    return null;
  }

  save({ tag }) {
    this.lectureTags.push({ tag });
    return { tag };
  }
}

class MockLectureDetailRepository {
  lectureDetail = [];
  save({ many, expire, description, level }) {
    this.lectureDetail.push({ many, expire, description, level });
    return { many, expire, description, level };
  }
}

class MockImageDetailLectureRepository {
  imageLectureDetail = [];
  save({ url }) {
    this.imageLectureDetail.push({ url });
    return { url };
  }
}

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('LectureService', () => {
  let lectureService: LectureService;
  let lectureRepository: MockRepository<Lecture>;

  beforeEach(async () => {
    const lectureModule: TestingModule = await Test.createTestingModule({
      providers: [
        LectureService,
        {
          provide: getRepositoryToken(Lecture),
          useClass: MockLectureRepository
        },
        {
          provide: getRepositoryToken(LectureService),
          useClass: MockLectureCategoryRepository
        },
        {
          provide: getRepositoryToken(ImageMainLecture),
          useClass: MockImageMainLectureRepository
        },
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository
        },
        {
          provide: getRepositoryToken(Review),
          useClass: MockReviewRepository
        },
        {
          provide: getRepositoryToken(Curriculum),
          useClass: MockCurriculumRepository
        },
        {
          provide: getRepositoryToken(LectureTag),
          useClass: MockLectureTagRepository
        },
        {
          provide: getRepositoryToken(LectureDetail),
          useClass: MockLectureDetailRepository
        },
        {
          provide: getRepositoryToken(ImageDetailLecture),
          useClass: MockImageDetailLectureRepository
        }
      ]
    }).compile();

    lectureService = lectureModule.get<LectureService>(LectureService);
    lectureRepository = lectureModule.get<MockRepository<Lecture>>(
      getRepositoryToken(Lecture)
    );
  });

  describe('강의 등록', () => {
    it('존재하는 유저인지 확인', async () => {
      const createLectureInput = {
        title: 'test강의',
        teacher: '다알랴줌',
        price: 33000,
        imageMainUrl: 'thumbnail.png',
        lectureCategoryId: 'C001',
        description: '상세내용',
        level: 'BEGINNER',
        imageDetailLecture: ['img1.png', 'img2.png'],
        section: ['test0,test1,test2,test3'],
        content: ['test0,test1,test2,test3,test4,test5,test6'],
        lectureTags: ['#test', '#test2']
      };

      const req: any = {
        user: {
          id: 'A002' //학생
        }
      };

      try {
        await lectureService.create({ req, createLectureInput });
      } catch (err) {
        expect(err).toBeInstanceOf(UnprocessableEntityException);
      }
    });

    it('강의등록 권한이 있는지 확인(선생인지 확인)', async () => {
      const createLectureInput = {
        title: 'test강의',
        teacher: '다알랴줌',
        price: 33000,
        imageMainUrl: 'thumbnail.png',
        lectureCategoryId: 'C001',
        description: '상세내용',
        level: 'BEGINNER',
        imageDetailLecture: ['img1.png', 'img2.png'],
        section: ['test0,test1,test2,test3'],
        content: ['test0,test1,test2,test3,test4,test5,test6'],
        lectureTags: ['#test', '#test2']
      };

      const req: any = {
        user: {
          role: 'STUDENT'
        }
      };

      try {
        await lectureService.create({ req, createLectureInput });
      } catch (err) {
        expect(err).toBeInstanceOf(UnprocessableEntityException);
      }
    });

    it('강의 카테고리가 함께 등록되었는지 확인', async () => {
      const createLectureInput = {
        title: 'test강의',
        teacher: '다알랴줌',
        price: 33000,
        imageMainUrl: 'thumbnail.png',
        lectureCategoryId: 'C001',
        description: '상세내용',
        level: 'BEGINNER',
        imageDetailLecture: ['img1.png', 'img2.png'],
        section: ['test0,test1,test2,test3'],
        content: ['test0,test1,test2,test3,test4,test5,test6'],
        lectureTags: ['#test', '#test2']
      };

      const req: any = {
        user: {
          id: 'A001'
        }
      };

      try {
        await lectureService.create({ req, createLectureInput });
      } catch (err) {
        expect(err).toBeInstanceOf(UnprocessableEntityException);
      }
    });

    it('강의 등록 검증', async () => {
      const createLectureInput = {
        title: 'test강의',
        teacher: '다알랴줌',
        price: 33000,
        imageMainUrl: 'thumbnail.png',
        lectureCategoryId: 'C001',
        description: '상세내용',
        level: 'BEGINNER',
        imageDetailLecture: ['img1.png', 'img2.png'],
        section: ['test0,test1,test2,test3'],
        content: ['test0,test1,test2,test3,test4,test5,test6'],
        lectureTags: ['#test', '#test2']
      };

      const req: any = {
        user: {
          id: 'A001', //선생
          role: 'TEACHER'
        }
      };

      const lectureRegisterd = {
        title: 'test강의',
        teacher: '다알랴줌',
        price: 33000,
        imageMainUrl: 'thumbnail.png',
        lectureCategoryId: 'C001',
        description: '상세내용',
        level: 'BEGINNER',
        imageDetailLecture: ['img1.png', 'img2.png'],
        section: ['test0,test1,test2,test3'],
        content: ['test0,test1,test2,test3,test4,test5,test6'],
        lectureTags: ['#test', '#test2']
      };

      const result = await lectureService.create({
        req,
        createLectureInput
      });
      expect(result.title).toStrictEqual(lectureRegisterd.title);
      expect(result.teacher).toStrictEqual(lectureRegisterd.teacher);
    });
  });

  describe('강의 업데이트', () => {
    it('강의등록 권한이 있는지 확인(선생인지 확인)', async () => {
      const createLectureInput = {
        title: 'test강의',
        teacher: '다알랴줌',
        price: 33000,
        imageMainUrl: 'thumbnail.png',
        lectureCategoryId: 'C001',
        description: '상세내용',
        level: 'BEGINNER',
        imageDetailLecture: ['img1.png', 'img2.png'],
        section: ['test0,test1,test2,test3'],
        content: ['test0,test1,test2,test3,test4,test5,test6'],
        lectureTags: ['#test', '#test2']
      };

      const req: any = {
        user: {
          role: 'STUDENT'
        }
      };

      try {
        await lectureService.create({ req, createLectureInput });
      } catch (err) {
        expect(err).toBeInstanceOf(UnprocessableEntityException);
      }
    });
  });
});
