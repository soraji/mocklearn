import { Req, Res, Injectable } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';


AWS.config.update({
  accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
  secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY,
});



@Injectable()
export class ImageMainLectureService {
  constructor() {}
  
  async fileupload(@Req() req, @Res() res) {
    try {
      this.upload(req, res, function(error) {
        if (error) {
          console.log(error);
          return res.status(404).json(`Failed to upload image file: ${error}`);
        }
        // console.log(req.files);
        return res.status(201).json(req.files[0].location);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }

  upload = multer({
    storage: multerS3({
      s3: new S3Client({
        credentials: {
          accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY as string,
          secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY as string,
        },
        region: 'ap-northeast-2',
      }),
      contentType: multerS3.AUTO_CONTENT_TYPE,
      bucket: process.env.AWS_BUCKET_NAME,
      acl: 'public-read',
      key: function(request, file, cb) {
        cb(null, `image/${Date.now().toString()}-${file.originalname}`);
      },
    }),
  }).array('upload', 1);

}
