import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { ImageUser } from './entities/imageUser.entity';
import { ImageUserController } from './imageUser.controller';
import { ImageUserService } from './imageUser.service';


@Module({
  imports: [TypeOrmModule.forFeature([ImageUser])],
  controllers: [ImageUserController],
  providers: [ImageUserService],
  exports: [ImageUserService],
})
export class ImageUserModule {}