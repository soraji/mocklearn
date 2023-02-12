import { Body, Controller, Delete, Get, Param, Patch, Post, UnprocessableEntityException } from "@nestjs/common";
import { CreateLectureInput } from "../lectures/dto/create-lecture.dto";
import { UpdateLectureInput } from "../lectures/dto/update-lecture.dto";
import { LectureService } from "../lectures/lecture.service";



@Controller('lecture')
export class LectureController{
  constructor(
    private readonly lectureService: LectureService,
  ) {}

  //----------------- 조회 -----------------------//
  @Get('/')
  async fetchAllLecture(){
    return await this.lectureService.fetchAll()
  }
  
  @Get('/:id')
  async fetchLecture(
    @Param('id') id:string
    ){
      return await this.lectureService.fetch({id});
    }
    
  //----------------- 생성 -----------------------//
  @Post('/')
  async createLecture(
    @Body() createLectureInput:CreateLectureInput
    ){
      return await this.lectureService.create({createLectureInput})
    }
    
  //----------------- 업데이트 -----------------------//
  @Patch('/:id')
  async updateLecture(
    @Body() updateLectureInput:UpdateLectureInput,
    @Param('id') id:string
    ){
      return await this.lectureService.update({id, updateLectureInput});
    }
    
  //----------------- 삭제 -----------------------//
  @Delete('/:id')
  async deleteLecture(
    @Param('id') id:string
  ){
    return await this.lectureService.delete({id});
  }
}