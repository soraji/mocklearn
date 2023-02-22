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
import { CreateLectureInput } from './dto/create-lecture.dto';
import { UpdateLectureInput } from './dto/update-lecture.dto';
import { Lecture } from './entities/lecture.entity';
import { LectureService } from './lecture.service';
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
import { AuthGuard } from '@nestjs/passport';

@Controller('lecture')
@ApiTags('강의 API')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  /****************************** 강의 목록 전체 조회 ******************************/
  @Get('/')
  @ApiOperation({
    summary: '강의 전체 조회',
    description: '강의 전체 조회 API'
  })
  async fetchAllLecture(@Param('page') page: number) {
    return await this.lectureService.fetchAll({ page });
  }

  /****************************** 강의 단일 조회 ******************************/
  @Get('/:id')
  @ApiOperation({
    summary: '강의 단일 조회',
    description: '강의 단일 조회 API'
  })
  async fetchLecture(@Param('id') id: string) {
    return await this.lectureService.fetch({ id });
  }

  /****************************** 강의 등록 ******************************/
  @Post('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('teacher'))
  @ApiOperation({ summary: '강의 생성', description: '강의 생성 API' })
  async createLecture(
    @Req() req, //
    @Body() createLectureInput: CreateLectureInput
  ) {
    return await this.lectureService.create({ req, createLectureInput });
  }

  /****************************** 강의 수정 ******************************/
  @Patch('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('teacher'))
  @ApiOperation({ summary: '강의 업데이트', description: '강의 업데이트 API' })
  async updateLecture(
    @Body() updateLectureInput: UpdateLectureInput,
    @Param('id') id: string,
    @Req() req //
  ) {
    const lecture = await this.lectureService.fetch({ id });

    return await this.lectureService.update({
      req,
      lecture,
      updateLectureInput
    });
  }

  /****************************** 강의 삭제 ******************************/
  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('teacher'))
  @ApiOperation({ summary: '강의 삭제', description: '강의 삭제 API' })
  async deleteLecture(@Param('id') id: string) {
    const lecture = await this.lectureService.fetch({ id });

    return await this.lectureService.delete({ lecture });
  }
}
