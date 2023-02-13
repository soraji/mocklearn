import { Body, Controller, Delete, Get, Param, Patch, Post, UnprocessableEntityException } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { LectureCategory } from "./entities/category.entity";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags('강의 카테고리 API')
export class CategoryController{
  constructor(
    private readonly categoryService: CategoryService,
  ) {}

  @Get('/')
  @ApiOperation({ summary: '강의 카테고리 전체 조회', description: '강의 카테고리 전체 조회 API' })
  @ApiCreatedResponse({ description: '강의 카테고리', type:LectureCategory })
  async getCategory(){
    return await this.categoryService.fetchAll()
  }
  
  @Post('/')
  @ApiOperation({ summary: '강의 카테고리 생성', description: '강의 카테고리 생성 API' })
  @ApiCreatedResponse({ description: '강의 카테고리 생성', type:LectureCategory })
  @ApiBody({
    schema: {
      properties: {
        name: { type: "string" }
      }
    }
  })
  async createCategory(
    @Body() body
  ):Promise<LectureCategory>{
    const name = body.name;
    if(name === undefined) throw new UnprocessableEntityException('카테고리 이름을 입력해주세요');
    return await this.categoryService.create({name})
    
  }

  @Patch('/:id')
  @ApiOperation({ summary: '강의 카테고리 수정', description: '강의 카테고리 수정 API' })
  @ApiCreatedResponse({ description: '강의 카테고리 수정', type:LectureCategory })
  @ApiBody({
    schema: {
      properties: {
        name: { type: "string" }
      }
    }
  })
  async updateCategory(
    @Body() body,
    @Param('id') id:string
  ){
    const name = body.name;
    return await this.categoryService.update({id, name});
  }

  @Delete('/:id')
  @ApiOperation({ summary: '강의 카테고리 삭제', description: '강의 카테고리 삭제 API' })
  @ApiResponse({status:200, description:'삭제완료'})
  async deleteCategory(
    @Param('id') id:string
  ){
    return await this.categoryService.delete({id});
  }
}