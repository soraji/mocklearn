import { LectureCategory } from 'src/apis/categories/entities/category.entity';
import { Curriculum } from 'src/apis/curriculum/entities/curriculum.entity';
import { ImageDetailLecture } from 'src/apis/imageDetailLecture/entities/imageDetailLecture.entity';
import { ImageMainLecture } from 'src/apis/imageMainLecture/entities/imageMainLecture.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';


@Entity()
export class Lecture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  teacher: string;

  @Column()
  price: string;

  @Column()
  star: string;

  @Column()
  imgurl: string;

  @Column()
  reviewCount: number;

  @ManyToOne(() => LectureCategory)
  lectureCategory: LectureCategory;

  @JoinColumn()
  @OneToOne(() => Curriculum)
  curriculum: Curriculum;

  @JoinColumn()
  @OneToOne(() => ImageMainLecture)
  imageMainLecture: ImageMainLecture;

  @OneToMany(() => ImageDetailLecture, (imageDetailLecture) => imageDetailLecture.lecture)
  imageDetailLecture: ImageDetailLecture[];
}
