import { ConflictException, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';

export class UserService{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async fetchAll(){
    const result = await this.userRepository.find()

    return result;
  }

  async fetch({id}){
    const result = await this.userRepository.findOne({
      where:{id:id},
    })

    return result;
  }

  async findUserByEmail({email}){
    const result = await this.userRepository.findOne({
      where:{email:email},
    })

    return result;
  }


  async create({createUserInput}){
    const { email, password, ...rest} = createUserInput;

    const user = await this.userRepository.findOne({ where:{ email } })
    if(user) throw new ConflictException('이미 가입된 이메일입니다');

    const hashedPassword = await bcrypt.hash(password, 10); 
    const result = await this.userRepository.save({
      email,
      password: hashedPassword,
      ...rest
    })

    return result;
  }

  async update({id, updateUserInput}){
    const {...user} = updateUserInput

    const result = await this.userRepository.save({
      id:id,
      ...user
    });

    return result;
  }

  async delete({id}){
    return await this.userRepository.delete({
      id:id
    })
  }
}