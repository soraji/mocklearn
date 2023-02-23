"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUserService = void 0;
const common_1 = require("@nestjs/common");
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const client_s3_1 = require("@aws-sdk/client-s3");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const imageUser_entity_1 = require("./entities/imageUser.entity");
AWS.config.update({
    accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY
});
let ImageUserService = class ImageUserService {
    constructor(imageUserRepository) {
        this.imageUserRepository = imageUserRepository;
        this.upload = multer({
            storage: multerS3({
                s3: new client_s3_1.S3Client({
                    credentials: {
                        accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
                        secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY
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
    async fileupload(req, res) {
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
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ImageUserService.prototype, "fileupload", null);
ImageUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(imageUser_entity_1.ImageUser)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ImageUserService);
exports.ImageUserService = ImageUserService;
//# sourceMappingURL=imageUser.service.js.map