import { Body, Controller, Delete, Get, Param, Patch, Post, UnprocessableEntityException } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateReviewInput } from "./dto/create-review.dto";
import { UpdateReviewInput } from "./dto/update-review.dto";

@Controller('review')
@ApiTags('수강평 API')
export class ReviewController{
  constructor(
    private readonly reviewService: ReviewService,
  ) {}

  //----------------- 조회 -----------------------//
  @Get('/:id')
  @ApiOperation({ summary: '수강평 단일 조회', description: '수강평 단일 조회 API' })
  async fetchLecture(
    @Param('id') id:string
    ){
      return await this.reviewService.fetch({id});
    }
    
  //----------------- 생성 -----------------------//
  @Post('/')
  @ApiOperation({ summary: '수강평 생성', description: '수강평 생성 API' })
  async createLecture(
    @Body() body,
    @Body() createReviewInput:CreateReviewInput
    ){
      console.log(body);
      return await this.reviewService.create({createReviewInput})
    }
    
  //----------------- 업데이트 -----------------------//
  @Patch('/:id')
  @ApiOperation({ summary: '수강평 업데이트', description: '수강평 업데이트 API' })
  async updateLecture(
    @Body() updateReviewInput:UpdateReviewInput,
    @Param('id') id:string
    ){
      return await this.reviewService.update({id, updateReviewInput});
    }
    
  //----------------- 삭제 -----------------------//
  @Delete('/:id')
  @ApiOperation({ summary: '수강평 삭제', description: '수강평 삭제 API' })
  async deleteLecture(
    @Param('id') id:string
  ){
    return await this.reviewService.delete({id});
  }
}