import { UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LectureCategory } from "../categories/entities/category.entity";
import { Lecture } from "./entities/lecture.entity";

export class LectureService{
  constructor(
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,

    @InjectRepository(LectureCategory)
    private readonly lectureCategoriesRepository: Repository<LectureCategory>,
  ) {}

  async fetchAll(){
    const result = await this.lectureRepository.find({relations:['lectureCategory']})

    return result;
  }

  async fetch({id}){
    const result = await this.lectureRepository.findOne({
      where:{id:id},
      relations:['lectureCategory']
    })

    return result;
  }


  async create({createLectureInput}){
    const {lectureCategoryId, ...lecture} = createLectureInput;

    if(!lectureCategoryId) throw new UnprocessableEntityException('카테고리를 입력하셔야 합니다');

    const result = await this.lectureRepository.save({
      ...lecture,
      lectureCategory:{id:lectureCategoryId}
    })

    return result;
  }

  async update({id, updateLectureInput}){
    const {lectureCategoryId, ...lecture} = updateLectureInput
    const categoryResult = await this.lectureCategoriesRepository.findOne({
      where: {
        id: lectureCategoryId,
      },
    });

    const result = await this.lectureRepository.save({
      id:id,
      ...lecture,
      lectureCategory: {
        ...categoryResult,
      },
    });

    return result;
  }

  async delete({id}){
    return await this.lectureRepository.delete({
      id:id
    })
  }
}