"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const imageUser_entity_1 = require("./entities/imageUser.entity");
const imageUser_controller_1 = require("./imageUser.controller");
const imageUser_service_1 = require("./imageUser.service");
let ImageUserModule = class ImageUserModule {
};
ImageUserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([imageUser_entity_1.ImageUser])],
        controllers: [imageUser_controller_1.ImageUserController],
        providers: [imageUser_service_1.ImageUserService],
        exports: [imageUser_service_1.ImageUserService],
    })
], ImageUserModule);
exports.ImageUserModule = ImageUserModule;
//# sourceMappingURL=imageUser.module.js.map