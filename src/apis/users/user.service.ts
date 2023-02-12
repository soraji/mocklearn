import { UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

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


  async create({createUserInput}){
    const { ...user} = createUserInput;

    const result = await this.userRepository.save({
      ...user
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