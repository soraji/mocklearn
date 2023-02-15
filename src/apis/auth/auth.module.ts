import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from 'src/common/auth/jwt-refresh.strategy';
import { JwtAccessStrategy } from 'src/common/auth/jwt-access.strategy';
import { JwtGoogleStrategy } from 'src/common/auth/jwt-social-google.strategy';
import { JwtNaverStrategy } from 'src/common/auth/jwt-social-naver.strategy';
import { JwtKakaoStrategy } from 'src/common/auth/jwt-social-kakao.strategy';
import { UserService } from '../users/user.service';
import { User } from '../users/entities/user.entity';
import { JwtTeacherStrategy } from 'src/common/auth/jwt-teacher.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([
      User
    ]),
  ],
  providers: [
    JwtAccessStrategy, //
    JwtTeacherStrategy,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtNaverStrategy,
    JwtKakaoStrategy,
    AuthService,
    UserService,
  ],
  controllers: [
    AuthController, //
  ],
})
export class AuthModule {}
