import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { ImageMainLectureService } from './imageMainLecture.service';

@Controller('imageMainLecture')
@ApiTags('강의 썸네일 이미지 업로드 API')
@UseGuards(AuthGuard('teacher'))
export class ImageMainLectureController {
  constructor(
    private readonly imageMainLectureService: ImageMainLectureService
  ) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: '강의 썸네일 이미지 업로드',
    description: '강의 썸네일 이미지 업로드 API'
  })
  @ApiCreatedResponse({
    description: '이미지 등록이 완료되면 이미지 url을 보여줍니다'
  })
  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @ApiConsumes('multipart/form-data')
  async create(@Req() request, @Res() response) {
    try {
      await this.imageMainLectureService.fileupload(request, response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }
}
