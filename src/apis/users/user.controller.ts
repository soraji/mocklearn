import { Body, Controller, Delete, Get, Param, Patch, Post, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserInput } from "./dto/create-user.dto";
import { UpdateUserInput } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('유저 API')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  //----------------- 조회 -----------------------//
  @Get('/')
  @ApiOperation({ summary: '유저 전체 조회', description: '유저 전체 조회 API' })
  async fetchAllLecture(){
    return await this.userService.fetchAll()
  }
  
  @Get('/:id')
  @ApiOperation({ summary: '유저 단일 조회', description: '유저 단일 조회 API' })
  async fetchLecture(
    @Param('id') id:string
    ){
      return await this.userService.fetch({id});
    }
    
  //----------------- 생성 -----------------------//
  @Post('/')
  @ApiOperation({ summary: '유저 생성', description: '유저 생성 API' })
  async createLecture(
    @Body() createUserInput:CreateUserInput
    ){
      return await this.userService.create({createUserInput})
    }
      
      //----------------- 업데이트 -----------------------//
  @Patch('/:id')
  @ApiOperation({ summary: '유저 업데이트', description: '유저 업데이트 API' })
  async updateLecture(
    @Body() updateUserInput:UpdateUserInput,
    @Param('id') id:string
    ){
      return await this.userService.update({id, updateUserInput});
    }
    
    //----------------- 삭제 -----------------------//
  @Delete('/:id')
  @ApiOperation({ summary: '유저 삭제', description: '유저 삭제 API' })
  async deleteLecture(
    @Param('id') id:string
  ){
    return await this.userService.delete({id});
  }
}
