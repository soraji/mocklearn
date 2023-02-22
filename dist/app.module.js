"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./apis/users/user.module");
const category_module_1 = require("./apis/categories/category.module");
const lecture_module_1 = require("./apis/lectures/lecture.module");
const payment_module_1 = require("./apis/payments/payment.module");
const review_module_1 = require("./apis/review/review.module");
const imageMainLecture_module_1 = require("./apis/imageMainLecture/imageMainLecture.module");
const imageUser_module_1 = require("./apis/imageUser/imageUser.module");
const imageDetailLecture_module_1 = require("./apis/imageDetailLecture/imageDetailLecture.module");
const auth_module_1 = require("./apis/auth/auth.module");
const jwt_access_strategy_1 = require("./common/auth/jwt-access.strategy");
const jwt_refresh_strategy_1 = require("./common/auth/jwt-refresh.strategy");
const jwt_teacher_strategy_1 = require("./common/auth/jwt-teacher.strategy");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            category_module_1.LectureCategoriesModule,
            lecture_module_1.LecturesModule,
            user_module_1.UsersModule,
            payment_module_1.PaymentsModule,
            review_module_1.ReviewModule,
            imageMainLecture_module_1.ImageMainLectureModule,
            imageUser_module_1.ImageUserModule,
            imageDetailLecture_module_1.ImageDetailLectureModule,
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: process.env.DATABASE_TYPE,
                host: process.env.DATABASE_HOST,
                port: Number(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_DATABASE,
                entities: [__dirname + '/apis/**/*.entity.*'],
                synchronize: true,
                logging: true
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            jwt_access_strategy_1.JwtAccessStrategy,
            jwt_refresh_strategy_1.JwtRefreshStrategy,
            jwt_teacher_strategy_1.JwtTeacherStrategy
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map