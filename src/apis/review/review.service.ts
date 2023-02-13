import { UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Lecture } from "../lectures/entities/lecture.entity";
import { Review } from "./entities/review.entity";

export class ReviewService{
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,

    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,

  ) {}

  async fetch({id}){
    const result = await this.reviewRepository.findOne({
      where:{id:id},
      relations:['lectureCategory']
    })

    return result;
  }


  async create({createReviewInput}){
    const { id } = createReviewInput;

    const lecture = await this.lectureRepository.findOne({
      where: { id: id },
    });

    if (!lecture)
      throw new UnprocessableEntityException('구매한 제품 정보를 입력해주세요');

    // const user = await this.usersRepository.findOne({
    //   where: { id: userId },
    // });

    // if (!user)
    //   throw new UnprocessableEntityException('구매자 정보를 입력해주세요');

    // 유저 다중으로 안해놓으면 상품이 바뀌어도 유저id로 한번밖에 글 작성을 못함
    // const userDuplicate = await this.reviewRepository.findOne({
    //   where: { user: { id: userId } },
    // });

    // if (userDuplicate) {
    //   throw new UnprocessableEntityException(
    //     user.name +
    //       '님은 이미 구매평을 작성하셨습니다. 1인당 1개의 구매평만 작성 가능합니다',
    //   );
    // }

    const result = await this.reviewRepository.save({
      ...createReviewInput,
      lecture: { id: id },
      // user: { id: userId },
    });

    await this.lectureRepository.save({
      //상품평 작성하면 상품에 상품평count +1
      id: id,
      commentCount: lecture.reviewCount + 1,
    });

    return result;
  }

  async update({id, updateReviewInput}){
    const {lectureCategoryId, ...lecture} = updateReviewInput;

    const result = await this.reviewRepository.save({
      id:id,
      ...lecture,
    });

    return result;
  }

  async delete({id}){
    return await this.reviewRepository.delete({
      id:id
    })
  }
}