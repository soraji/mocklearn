import { Body, Controller, Delete, Get, Param, Patch, Post, UnprocessableEntityException, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LectureDetailService } from "./lectureDetail.service";
import {CreateLectureDetailInput} from './dto/create-detail.dto'
import {UpdateLectureDetailInput} from './dto/update-detail.dto'
import { AuthGuard } from "@nestjs/passport";

@Controller('lectureDetail')
@ApiTags('강의 상세페이지 API')
export class LectureDetailController{
  constructor(
    private readonly lectureDetailService: LectureDetailService,
  ) {}

  //----------------- 조회 -----------------------//
  @Get('/')
  @ApiOperation({ summary: '강의 전체 조회', description: '강의 전체 조회 API' })
  async fetchAllLecture(){
    return await this.lectureDetailService.fetchAll()
  }
  
  @Get('/:id')
  @ApiOperation({ summary: '강의 단일 조회', description: '강의 단일 조회 API' })
  async fetchLecture(
    @Param('id') id:string
    ){
      return await this.lectureDetailService.fetch({id});
    }
    
  //----------------- 생성 -----------------------//
  @Post('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard("teacher"))
  @ApiOperation({ summary: '강의 생성', description: '강의 생성 API' })
  async createLecture(
    @Body() createLectureDetailInput:CreateLectureDetailInput
    ){
      return await this.lectureDetailService.create({createLectureDetailInput})
    }
    
  //----------------- 업데이트 -----------------------//
  @Patch('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard("teacher"))
  @ApiOperation({ summary: '강의 업데이트', description: '강의 업데이트 API' })
  async updateLecture(
    @Body() updateLectureDetailInput:UpdateLectureDetailInput,
    @Param('id') id:string
    ){
      return await this.lectureDetailService.update({id, updateLectureDetailInput});
    }
    
  //----------------- 삭제 -----------------------//
  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard("teacher"))
  @ApiOperation({ summary: '강의 삭제', description: '강의 삭제 API' })
  async deleteLecture(
    @Param('id') id:string
  ){
    return await this.lectureDetailService.delete({id});
  }
}
