import { UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LectureDetail } from "./entities/lectureDetail.entity";

export class LectureDetailService{
  constructor(
    @InjectRepository(LectureDetail)
    private readonly lectureDetailRepository: Repository<LectureDetail>,
  ) {}

  async fetchAll(){
    const result = await this.lectureDetailRepository.find({relations:['lectureCategory']})

    return result;
  }

  async fetch({id}){
    const result = await this.lectureDetailRepository.findOne({
      where:{id:id},
      relations:['lectureCategory']
    })

    return result;
  }


  async create({createLectureDetailInput}){
  }

  async update({id, updateLectureDetailInput}){
    
  }

  async delete({id}){
    return await this.lectureDetailRepository.delete({
      id:id
    })
  }
}
