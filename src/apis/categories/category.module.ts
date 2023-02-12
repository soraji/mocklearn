import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { LectureCategory } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LectureCategory])],
  providers: [CategoryService],
  controllers:[CategoryController]
})
export class LectureCategoriesModule {}
