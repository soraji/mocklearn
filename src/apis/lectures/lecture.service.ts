import { UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LectureCategory } from '../categories/entities/category.entity';
import { Curriculum } from '../curriculum/entities/curriculum.entity';
import { ImageDetailLecture } from '../imageDetailLecture/entities/imageDetailLecture.entity';
import { ImageMainLecture } from '../imageMainLecture/entities/imageMainLecture.entity';
import { LectureDetail } from '../lectureDetails/entities/lectureDetail.entity';
import { Review } from '../review/entities/review.entity';
import { Lecture } from './entities/lecture.entity';

export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,

    @InjectRepository(ImageMainLecture)
    private readonly imageMainLecture: Repository<ImageMainLecture>,

    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,

    @InjectRepository(Curriculum)
    private readonly curriculumRepository: Repository<Curriculum>,

    @InjectRepository(LectureDetail)
    private readonly lectureDetailRepository: Repository<LectureDetail>,

    @InjectRepository(ImageDetailLecture)
    private readonly imageDetailRepository: Repository<ImageDetailLecture>
  ) {}

  /****************************** 강의 목록 전체 조회 ******************************/
  async fetchAll({ page }) {
    const result = await this.lectureRepository.find({
      take: 24,
      skip: (page - 1) * 24,
      order: {
        price: 'ASC'
      },
      relations: ['lectureCategory', 'imageMainLecture']
    });

    return result;
  }

  /****************************** 강의 단일 조회 ******************************/
  async fetch({ id }) {
    const result = await this.lectureRepository.findOne({
      where: { id: id },
      relations: [
        'lectureCategory',
        'lectureDetail',
        'imageMainLecture',
        'imageDetailLecture',
        'curriculum'
      ]
    });

    return result;
  }

  /****************************** 강의 등록 ******************************/
  async create({ req, createLectureInput }) {
    const {
      imageMainUrl,
      lectureCategoryId,
      many,
      expire,
      description,
      level,
      imageDetailLecture,
      section,
      content,
      ...lecture
    } = createLectureInput;

    /* TEACHER 권한을 가진 사용자만 강의 등록 가능 */
    if (req.user.role !== 'TEACHER')
      throw new UnprocessableEntityException('강의 등록 권한이 없습니다');

    /* 카테고리 필수 입력 */
    if (!lectureCategoryId)
      throw new UnprocessableEntityException('카테고리를 입력하셔야 합니다');

    /* 썸네일 이미지는 필수 등록 */
    if (!imageMainUrl)
      throw new UnprocessableEntityException(
        '대표 이미지는 반드시 등록해야 합니다'
      );

    /* 이미지 먼저 등록 (썸네일 이미지 필수 등록) */
    const img = await this.imageMainLecture.save({
      url: imageMainUrl
    });

    /* 강의상세 테이블에도 자동으로 저장 */
    const detail = await this.lectureDetailRepository.save({
      many,
      expire,
      description,
      level
    });

    /* 커리큘럼 테이블에도 자동으로 저장 */
    const curr = await this.curriculumRepository.save({
      section,
      content
    });

    /* 이미지와 카테고리를 합쳐 강의 등록 */
    const result = await this.lectureRepository.save({
      ...lecture,
      imageMainLecture: img,
      lectureCategory: { id: lectureCategoryId },
      lectureDetail: { id: detail.id },
      curriculum: { id: curr.id }
    });

    /* 상세페이지에 이미지가 있다면 배열로 입력되므로 promise로 저장하기 */
    if (imageDetailLecture) {
      await Promise.all(
        imageDetailLecture.map((el, i) => {
          return new Promise(async (resolve, reject) => {
            try {
              const newImage = await this.imageDetailRepository.save({
                url: el,
                lecture: { id: result.id }
              });

              resolve(newImage);
            } catch (err) {
              reject(err);
            }
          });
        })
      );
    }

    return result;
  }

  /****************************** 강의 수정 ******************************/
  async update({ req, lecture, updateLectureInput }) {
    const {
      imageMainUrl,
      lectureCategoryId,
      many,
      expire,
      description,
      level,
      imageDetailLecture,
      ...rest
    } = updateLectureInput;

    /* TEACHER 권한을 가진 사용자만 강의 등록 가능 */
    if (req.user.role !== 'TEACHER')
      throw new UnprocessableEntityException('강의 등록 권한이 없습니다');

    let result: Lecture;
    /* 메인 이미지를 변경하려고 한다면 */
    if (imageMainUrl) {
      /* 썸네일 이미지를 수정하려고 한다면 썸네일 이미지의 새로운 url이 존재해야한다 */
      const img = await this.imageMainLecture.save({
        url: imageMainUrl
      });

      /* 이미지와 카테고리를 합쳐 강의 업데이트 */
      result = await this.lectureRepository.save({
        id: lecture.id,
        ...rest,
        imageMainLecture: img,
        lectureCategory: { id: lectureCategoryId }
      });
    } else {
      result = await this.lectureRepository.save({
        id: lecture.id,
        ...rest,
        lectureCategory: { id: lectureCategoryId }
      });
    }

    /* (강의id에 해당하는) 기존에 저장되어있던 이미지 id 찾아 삭제 (저장(변경) 로직 밑에 적어야 삭제할때 PK에러 발생 방지)*/
    await this.imageMainLecture.delete({
      id: lecture.imageMainLecture.id
    });

    const lectureDetail = await this.lectureDetailRepository.findOne({
      where: { lecture: { id: lecture.id } }
    });

    /* 강의를 등록하면 강의상세 테이블에도 자동으로 저장 */
    await this.lectureDetailRepository.save({
      id: lectureDetail.id,
      many,
      expire,
      description,
      level,
      lecture: { id: result.id }
    });

    /* 상세페이지 이미지를 변경하려고 한다면 */
    if (imageDetailLecture) {
      /* (강의id에 해당하는) 기존에 저장되어있던 이미지 전부 삭제 */
      await this.imageDetailRepository
        .createQueryBuilder()
        .delete()
        .where('lectureId IN (:lectureId)', { lectureId: lecture.id })
        .execute();

      /* 변경하려고 하는 이미지 새로 저장 */
      await Promise.all(
        imageDetailLecture.map((el, i) => {
          return new Promise(async (resolve, reject) => {
            try {
              const newImage = await this.imageDetailRepository.save({
                url: el,
                lecture: { id: result.id }
              });

              resolve(newImage);
            } catch (err) {
              reject(err);
            }
          });
        })
      );
    }

    return result;
  }

  /****************************** 강의 삭제 ******************************/
  async delete({ lecture }) {
    /* 강의에 해당하는 상세이미지 전체삭제 */
    await this.imageDetailRepository
      .createQueryBuilder()
      .delete()
      .where('lectureId IN (:lectureId)', { lectureId: lecture.id })
      .execute();

    /* 강의에 해당하는 수강평 전체삭제 */
    await this.reviewRepository
      .createQueryBuilder()
      .delete()
      .where('lectureId IN (:lectureId)', { lectureId: lecture.id })
      .execute();

    /* 강의 삭제 */
    await this.lectureRepository.delete({
      id: lecture.id
    });

    /* 커리큘럼 삭제 */
    await this.curriculumRepository.delete({
      id: lecture.curriculum.id
    });

    /* 강의에 해당되는 썸네일 이미지 삭제 */
    await this.imageMainLecture.delete({
      id: lecture.imageMainLecture.id
    });

    /* 강의 상세페이지 삭제 */
    await this.lectureDetailRepository.delete({
      id: lecture.lectureDetail.id
    });
  }
}
