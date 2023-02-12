import { Body, Controller, Delete, Get, Param, Patch, Post, UnprocessableEntityException } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { LectureCategory } from "./entities/category.entity";

@Controller('category')
export class CategoryController{
  constructor(
    private readonly categoryService: CategoryService,
  ) {}

  @Get('/')
  async getCategory(){
    return await this.categoryService.fetchAll()
  }
  
  @Post('/')
  async createCategory(
    @Body() body
  ):Promise<LectureCategory>{
    const name = body.name;
    if(name === undefined) throw new UnprocessableEntityException('카테고리 이름을 입력해주세요');
    return await this.categoryService.create({name})
    
  }

  @Patch('/:id')
  async updateCategory(
    @Body() body,
    @Param('id') id:string
  ){
    const name = body.name;
    return await this.categoryService.update({id, name});
  }

  @Delete('/:id')
  async deleteCategory(
    @Param('id') id:string
  ){
    return await this.categoryService.delete({id});
  }
}