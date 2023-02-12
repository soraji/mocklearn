import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LectureCategory } from "./entities/category.entity";

export class CategoryService{
  constructor(
    @InjectRepository(LectureCategory)
    private readonly lectureCategoriesRepository: Repository<LectureCategory>,
  ) {}

  async fetchAll(){
    return await this.lectureCategoriesRepository.find();
  }

  async create({name}){
    return await this.lectureCategoriesRepository.save({name:name})
  }

  async update({id, name}){
    return await this.lectureCategoriesRepository.save({
      id:id,
      name:name
    })
  }

  async delete({id}){
    return await this.lectureCategoriesRepository.delete({
      id:id
    })
  }
}