import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './apis/users/user.module';
import { LectureCategoriesModule } from './apis/categories/category.module';
import { LecturesModule } from './apis/lectures/lecture.module';
import { PaymentsModule } from './apis/payments/payment.module';
import { ReviewModule } from './apis/review/review.module';
import { ImageMainLectureModule } from './apis/imageMainLecture/imageMainLecture.module';
import { ImageUserModule } from './apis/imageUser/imageUser.module';
import { ImageDetailLectureModule } from './apis/imageDetailLecture/imageDetailLecture.module';
import { LectureDetailsModule } from './apis/lectureDetails/lectureDetail.module';
import { CurriculumsModule } from './apis/curriculum/curriculum.module';
import { AuthModule } from './apis/auth/auth.module';
import { JwtAccessStrategy } from './common/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from './common/auth/jwt-refresh.strategy';
import { JwtTeacherStrategy } from './common/auth/jwt-teacher.strategy';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    LectureCategoriesModule,
    LecturesModule,
    UsersModule,
    PaymentsModule,
    ReviewModule,
    ImageMainLectureModule,
    ImageUserModule,
    ImageDetailLectureModule,
    LectureDetailsModule,
    CurriculumsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    JwtAccessStrategy, //
    JwtRefreshStrategy,
    JwtTeacherStrategy
  ],
})

export class AppModule {}
