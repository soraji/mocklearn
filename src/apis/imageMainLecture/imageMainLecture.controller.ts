import { Controller, Post, Req, Res } from '@nestjs/common';
import { ImageMainLectureService } from './imageMainLecture.service';

@Controller('imageMainLecture')
export class ImageMainLectureController {
  constructor(private readonly imageMainLectureService: ImageMainLectureService) {}
  @Post()
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