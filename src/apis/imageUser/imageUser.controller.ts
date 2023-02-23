import {
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { ImageUserService } from './imageUser.service';
import { ImageUser } from './entities/imageUser.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('imageUser')
@ApiTags('유저 이미지 업로드 API')
@UseGuards(AuthGuard('teacher'))
export class ImageUserController {
  constructor(private readonly imageUserService: ImageUserService) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: '유저 이미지 업로드',
    description: '유저 이미지 업로드 API'
  })
  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        upload: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @ApiConsumes('multipart/form-data')
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
