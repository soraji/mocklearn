import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnprocessableEntityException,
  UseGuards
} from '@nestjs/common';
import { ReviewService } from './review.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { CreateReviewInput } from './dto/create-review.dto';
import { UpdateReviewInput } from './dto/update-review.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('review')
@ApiTags('수강평 API')
@ApiBearerAuth()
@UseGuards(AuthGuard('access'))
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  /****************************** 수강평 조회 ******************************/
  @Get('/')
  @ApiOperation({
    summary: '수강평 조회',
    description: '본인이 작성한 수강평만 조회 가능'
  })
  async fetchAllReview(@Req() req) {
    return await this.reviewService.fetchAll({ req });
  }

  @Get('/:id')
  @ApiOperation({
    summary: '수강평 조회',
    description: '수강평 조회 API'
  })
  async fetchReview(@Param('id') id: string) {
    return await this.reviewService.fetch({ id });
  }

  /****************************** 수강평 생성 ******************************/
  @Post('/')
  @ApiOperation({ summary: '수강평 생성', description: '수강평 생성 API' })
  async createReview(@Req() req, @Body() createReviewInput: CreateReviewInput) {
    return await this.reviewService.create({ req, createReviewInput });
  }

  /****************************** 수강평 수정 ******************************/
  @Patch('/:id')
  @ApiOperation({
    summary: '수강평 업데이트',
    description: '수강평 업데이트 API'
  })
  async updateReview(
    @Body() updateReviewInput: UpdateReviewInput,
    @Param('id') id: string,
    @Req() req
  ) {
    const review = await this.reviewService.fetch({ id });

    return await this.reviewService.update({ req, review, updateReviewInput });
  }

  /****************************** 수강평 삭제 ******************************/
  @Delete('/:id')
  @ApiOperation({ summary: '수강평 삭제', description: '수강평 삭제 API' })
  async deleteReview(@Param('id') id: string) {
    const review = await this.reviewService.fetch({ id });

    return await this.reviewService.delete({ review });
  }
}
