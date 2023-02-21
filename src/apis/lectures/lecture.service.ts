import { UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LectureCategory } from '../categories/entities/category.entity';
import { ImageDetailLecture } from '../imageDetailLecture/entities/imageDetailLecture.entity';
import { ImageMainLecture } from '../imageMainLecture/entities/imageMainLecture.entity';
import { LectureDetail } from '../lectureDetails/entities/lectureDetail.entity';
import { Lecture } from './entities/lecture.entity';

export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,

    @InjectRepository(ImageMainLecture)
    private readonly imageMainLecture: Repository<ImageMainLecture>,

    @InjectRepository(LectureCategory)
    private readonly lectureCategoriesRepository: Repository<LectureCategory>,

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

    /* 이미지와 카테고리를 합쳐 강의 등록 */
    const result = await this.lectureRepository.save({
      ...lecture,
      imageMainLecture: img,
      lectureCategory: { id: lectureCategoryId }
    });

    /* 강의를 등록하면 강의상세 테이블에도 자동으로 저장 */
    await this.lectureDetailRepository.save({
      many,
      expire,
      description,
      level,
      lecture: { id: result.id }
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
  async update({ req, id, updateLectureInput }) {
    const {
      imageMainUrl,
      lectureCategoryId,
      many,
      expire,
      description,
      level,
      imageDetailLecture,
      ...lecture
    } = updateLectureInput;

    /* TEACHER 권한을 가진 사용자만 강의 등록 가능 */
    if (req.user.role !== 'TEACHER')
      throw new UnprocessableEntityException('강의 등록 권한이 없습니다');

    let result: Lecture;
    if (imageMainUrl) {
      /* 썸네일 이미지를 수정하려고 한다면 썸네일 이미지의 새로운 url이 존재해야한다 */
      const img = await this.imageMainLecture.save({
        url: imageMainUrl
      });

      /* 이미지와 카테고리를 합쳐 강의 업데이트 */
      result = await this.lectureRepository.save({
        id: id,
        ...lecture,
        imageMainLecture: img,
        lectureCategory: { id: lectureCategoryId }
      });
    } else {
      result = await this.lectureRepository.save({
        id: id,
        ...lecture,
        lectureCategory: { id: lectureCategoryId }
      });
    }

    /* 강의를 등록하면 강의상세 테이블에도 자동으로 저장 */
    await this.lectureDetailRepository.save({
      many,
      expire,
      description,
      level,
      lecture: { id: result.id }
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

  /****************************** 강의 삭제 ******************************/
  async delete({ id }) {
    return await this.lectureRepository.delete({
      id: id
    });
  }
}
