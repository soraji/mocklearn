import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurriculumController } from './curriculum.controller';
import { CurriculumService } from './curriculum.service';
import { Curriculum } from './entities/curriculum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Curriculum])],
  providers: [CurriculumService],
  controllers:[CurriculumController]
})
export class CurriculumsModule {}
