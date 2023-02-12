import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LectureCategory } from "./entities/category.entity";

export class CategoryService{
  constructor(
    @InjectRepository(LectureCategory)
    private readonly productCategoriesRepository: Repository<LectureCategory>,
  ) {}

  async fetchAll(){
    return await this.productCategoriesRepository.find();
  }

  async create({name}){
    return await this.productCategoriesRepository.save({name:name})
  }

  async update({id, name}){
    return await this.productCategoriesRepository.save({
      id:id,
      name:name
    })
  }

  async delete({id}){
    return await this.productCategoriesRepository.delete({
      id:id
    })
  }
}