import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ImageUser } from 'src/apis/imageUser/entities/imageUser.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

class MockUserRepository {
  mydb = [
    {
      name: '테스트1',
      email: 'test1@gmail.com',
      phone: '01023456789',
      hashedPassword: '1234'
    },
    {
      name: '테스트2',
      email: 'test2@gmail.com',
      phone: '01012341234',
      hashedPassword: '1234'
    }
  ];

  findOne(email: any) {
    const userEmail = this.mydb.filter(el => el.email === email.where.email);
    if (userEmail.length >= 1) return userEmail[0];
    return null;
  }

  save({ name, email, phone, hashedPassword }) {
    this.mydb.push({ name, email, phone, hashedPassword });
    return { name, email, phone, hashedPassword };
  }
}

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let userService: UserService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository
        },
        {
          provide: getRepositoryToken(ImageUser),
          useValue: {}
        }
      ]
    }).compile();

    userService = userModule.get<UserService>(UserService);
    userRepository = userModule.get<MockRepository<User>>(
      getRepositoryToken(User)
    );
  });

  describe('create', () => {
    it('이미 존재하는 이메일인지 검증', async () => {
      const createUserInput = {
        name: '테스트1',
        email: 'test1@gmail.com',
        phone: '01099998888',
        password: '1234'
      };
      try {
        await userService.create({ createUserInput });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('회원 등록 제대로 됐는지 확인', async () => {
      const createUserInput = {
        name: '테스트3',
        email: 'test3@gmail.com',
        phone: '01012341234',
        password: '1234'
      };

      const myResultDate = {
        name: '테스트3',
        email: 'test3@gmail.com',
        phone: '01012341234',
        hashedPassword: '1234'
      };

      const result = await userService.create({ createUserInput });
      expect(result.email).toStrictEqual(myResultDate.email);
      expect(result.phone).toStrictEqual(myResultDate.phone);
    });
  });
});
