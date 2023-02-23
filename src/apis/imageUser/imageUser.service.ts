import { Req, Res, Injectable } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageUser } from './entities/imageUser.entity';

AWS.config.update({
  accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
  secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY
});

@Injectable()
export class ImageUserService {
  constructor(
    @InjectRepository(ImageUser)
    private readonly imageUserRepository: Repository<ImageUser>
  ) {}

  async fileupload(@Req() req, @Res() res) {
    const imageUserRepository = this.imageUserRepository;
    const result = this.upload(req, res, async function (error) {
      if (error) {
        console.log(error);
        return res
          .status(404)
          .json(`유저 이미지 업로드에 실패했습니다: ${error}`);
      }

      await imageUserRepository.save({
        url: req.files[0].location
      });
      res.status(201).json(req.files[0].location);
    });
  }

  upload = multer({
    storage: multerS3({
      s3: new S3Client({
        credentials: {
          accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY as string,
          secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY as string
        },
        region: 'ap-northeast-2'
      }),
      contentType: multerS3.AUTO_CONTENT_TYPE,
      bucket: process.env.AWS_BUCKET_NAME,
      acl: 'public-read',
      key: function (request, file, cb) {
        cb(null, `image/user/${Date.now().toString()}-${file.originalname}`);
      }
    })
  }).array('upload', 1);
}
