import { Controller, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ImageDetailLectureService } from './imageDetailLecture.service';

@Controller('imageDetailLecture')
@ApiTags('강의 상세페이지 이미지 업로드 API')
export class ImageDetailLectureController {
  constructor(private readonly imageDetailLectureService: ImageDetailLectureService) {}
  @Post()
  @ApiOperation({ summary: '강의 상세페이지 이미지 업로드', description: '강의 상세페이지 이미지 업로드 API' })
  @ApiCreatedResponse({ description: '이미지 등록이 완료되면 이미지 url을 보여줍니다' })
  @ApiBody({
    required: true,
    type: "multipart/form-data",
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiConsumes("multipart/form-data")
  async create(@Req() request, @Res() response) {
    try {
      await this.imageDetailLectureService.fileupload(request, response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }
}