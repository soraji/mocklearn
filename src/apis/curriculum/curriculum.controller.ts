import { Body, Controller, Delete, Get, Param, Patch, Post, UnprocessableEntityException, UseGuards } from "@nestjs/common";
import { CreateCurriculumInput } from "./dto/create-curriculum.dto";
import { UpdateCurriculumInput } from "./dto/update-curriculum.dto";
import { CurriculumService } from "./curriculum.service";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from "@nestjs/passport";

@Controller('curriculum')
@ApiTags('커리큘럼 API')
export class CurriculumController{
  constructor(
    private readonly curriculumService: CurriculumService,
  ) {}

  //----------------- 조회 -----------------------//
  @Get('/')
  @ApiOperation({ summary: '커리큘럼 전체 조회', description: '커리큘럼 전체 조회 API' })
  async fetchAllLecture(){
    return await this.curriculumService.fetchAll()
  }
  
  @Get('/:id')
  @ApiOperation({ summary: '커리큘럼 단일 조회', description: '커리큘럼 단일 조회 API' })
  async fetchLecture(
    @Param('id') id:string
    ){
      return await this.curriculumService.fetch({id});
    }
    
  //----------------- 생성 -----------------------//
  @Post('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard("teacher"))
  @ApiOperation({ summary: '커리큘럼 생성', description: '커리큘럼 생성 API' })
  async createLecture(
    @Body() createCurriculumInput:CreateCurriculumInput
    ){
      return await this.curriculumService.create({createCurriculumInput})
    }
    
  //----------------- 업데이트 -----------------------//
  @Patch('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard("teacher"))
  @ApiOperation({ summary: '커리큘럼 업데이트', description: '커리큘럼 업데이트 API' })
  async updateLecture(
    @Body() updateCurriculumInput:UpdateCurriculumInput,
    @Param('id') id:string
    ){
      return await this.curriculumService.update({id, updateCurriculumInput});
    }
    
  //----------------- 삭제 -----------------------//
  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard("teacher"))
  @ApiOperation({ summary: '커리큘럼 삭제', description: '커리큘럼 삭제 API' })
  async deleteLecture(
    @Param('id') id:string
  ){
    return await this.curriculumService.delete({id});
  }
}