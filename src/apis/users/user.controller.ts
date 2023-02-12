import { Body, Controller, Delete, Get, Param, Patch, Post, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserInput } from "./dto/create-user.dto";
import { UpdateUserInput } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

interface IOAuthUser {
  user: {
    name: string;
    email: string;
    password: string;
  };
}

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  //----------------- 조회 -----------------------//
  @Get('/')
  async fetchAllLecture(){
    return await this.userService.fetchAll()
  }
  
  @Get('/:id')
  async fetchLecture(
    @Param('id') id:string
    ){
      return await this.userService.fetch({id});
    }
    
  //----------------- 생성 -----------------------//
  @Post('/')
  async createLecture(
    @Body() createUserInput:CreateUserInput
    ){
      return await this.userService.create({createUserInput})
    }
    
  //----------------- 업데이트 -----------------------//
  @Patch('/:id')
  async updateLecture(
    @Body() updateUserInput:UpdateUserInput,
    @Param('id') id:string
    ){
      return await this.userService.update({id, updateUserInput});
    }
    
  //----------------- 삭제 -----------------------//
  @Delete('/:id')
  async deleteLecture(
    @Param('id') id:string
  ){
    return await this.userService.delete({id});
  }
}
