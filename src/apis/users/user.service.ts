import {
  ConflictException,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ImageUser } from '../imageUser/entities/imageUser.entity';
import * as bcrypt from 'bcrypt';

export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(ImageUser)
    private readonly imageUserRepository: Repository<ImageUser>
  ) {}

  async fetchAll() {
    const result = await this.userRepository.find();

    return result;
  }

  async fetch({ id }) {
    const result = await this.userRepository.findOne({
      where: { id: id }
    });

    return result;
  }

  async findUserByEmail({ email }) {
    const result = await this.userRepository.findOne({
      where: { email: email }
    });

    return result;
  }

  async create({ createUserInput }) {
    const { email, password, imageUser, ...rest } = createUserInput;

    const user = await this.userRepository.findOne({ where: { email } });
    if (user) throw new ConflictException('이미 가입된 이메일입니다');

    /* 유저 이미지를 등록했다면 */
    let img;
    if (imageUser) {
      img = await this.imageUserRepository.save({
        url: imageUser
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.userRepository.save({
      email,
      imageUser: img,
      password: hashedPassword,
      ...rest
    });

    return result;
  }

  async update({ id, updateUserInput }) {
    const { ...user } = updateUserInput;

    const result = await this.userRepository.save({
      id: id,
      ...user
    });

    return result;
  }

  async delete({ id }) {
    return await this.userRepository.delete({
      id: id
    });
  }
}
