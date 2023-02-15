import { UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Curriculum } from "./entities/curriculum.entity";

export class CurriculumService{
  constructor(
    @InjectRepository(Curriculum)
    private readonly curriculumRepository: Repository<Curriculum>,
  ) {}

  async fetchAll(){
    const result = await this.curriculumRepository.find({relations:['lectureCategory']})

    return result;
  }

  async fetch({id}){
    const result = await this.curriculumRepository.findOne({
      where:{id:id},
      relations:['lectureCategory']
    })

    return result;
  }


  async create({createCurriculumInput}){
  }

  async update({id, updateCurriculumInput}){
    
  }

  async delete({id}){
    return await this.curriculumRepository.delete({
      id:id
    })
  }
}