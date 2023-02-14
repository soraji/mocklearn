import { Controller, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ImageUserService } from './imageUser.service';
import {ImageUser} from './entities/imageUser.entity'
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('imageUser')
@ApiTags('유저 이미지 업로드 API')
export class ImageUserController {
  constructor(private readonly imageUserService: ImageUserService) {}
  @Post()
  @ApiOperation({ summary: '유저 이미지 업로드', description: '유저 이미지 업로드 API' })
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
      await this.imageUserService.fileupload(request, response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }
}