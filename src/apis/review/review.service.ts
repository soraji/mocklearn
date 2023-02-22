import { UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lecture } from '../lectures/entities/lecture.entity';
import { User } from '../users/entities/user.entity';
import { Review } from './entities/review.entity';

export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,

    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  /****************************** 수강평 조회 ******************************/
  async fetchAll({ req }) {
    //로그인한 유저가 작성한 수강평만 조회한다
    const result = await this.reviewRepository.findOne({
      where: { user: { id: req.user.id } },
      relations: ['lecture']
    });

    return result;
  }

  async fetch({ id }) {
    const result = await this.reviewRepository.findOne({
      where: { id: id },
      relations: ['lecture']
    });

    return result;
  }

  /****************************** 수강평 생성 ******************************/
  async create({ req, createReviewInput }) {
    const { lectureId, ...review } = createReviewInput;

    // 수강평을 작성할 강의가 존재하는지 확인
    const lecture = await this.lectureRepository.findOne({
      where: { id: lectureId }
    });

    if (!lecture)
      throw new UnprocessableEntityException('강의가 존재하지 않습니다');

    // 로그인 유저 확인
    const user = await this.userRepository.findOne({
      where: { id: req.user.id }
    });

    if (!user)
      throw new UnprocessableEntityException(
        '사용자 정보를 확인할 수 없습니다'
      );

    // 구매한 강의에 1개의 수강평만 작성 가능
    const userDuplicate = await this.reviewRepository.findOne({
      where: { user: { id: req.user.id }, lecture: { id: lectureId } }
    });

    if (userDuplicate) {
      throw new UnprocessableEntityException(
        user.name +
          '님은 이미 구매평을 작성하셨습니다. 구매한 강의에는 1개의 수강평만 작성 가능합니다'
      );
    }

    //수강평에 정보 저장
    const result = await this.reviewRepository.save({
      ...review,
      lecture: { id: lectureId },
      user: { id: req.user.id }
    });

    //상품평 작성하면 상품에 상품평 count +1
    await this.lectureRepository.save({
      id: lectureId,
      reviewCount: lecture.reviewCount + 1
    });

    return result;
  }

  /****************************** 수강평 수정 ******************************/
  async update({ req, review, updateReviewInput }) {
    const { lectureId, ...rest } = updateReviewInput;

    //작성한 유저가 맞는지 확인
    const userCheck = await this.reviewRepository.findOne({
      user: { id: req.user.id }
    });

    if (!userCheck)
      throw new UnprocessableEntityException(
        '작성하신 수강평의 정보와 사용자 정보가 일치하지 않습니다'
      );

    const result = await this.reviewRepository.save({
      id: review.id,
      lecture: { id: lectureId },
      ...rest
    });

    return result;
  }

  /****************************** 수강평 삭제 ******************************/
  async delete({ review }) {
    await this.lectureRepository
      .createQueryBuilder()
      .update()
      .set({
        reviewCount: () => 'reviewCount - 1'
      })
      .where('id =:id', {
        id: review.lecture.id
      })
      .execute();

    return await this.reviewRepository.delete({
      id: review.id
    });
  }
}
