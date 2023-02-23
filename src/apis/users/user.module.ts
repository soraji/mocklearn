import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageUser } from '../imageUser/entities/imageUser.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, ImageUser])],
  providers: [UserService],
  controllers: [UserController]
})
export class UsersModule {}
