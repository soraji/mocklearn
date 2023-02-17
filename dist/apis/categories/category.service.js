"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
let CategoryService = class CategoryService {
    constructor(lectureCategoriesRepository) {
        this.lectureCategoriesRepository = lectureCategoriesRepository;
    }
    async fetchAll() {
        return await this.lectureCategoriesRepository.find();
    }
    async create({ name }) {
        return await this.lectureCategoriesRepository.save({ name: name });
    }
    async update({ id, name }) {
        return await this.lectureCategoriesRepository.save({
            id: id,
            name: name
        });
    }
    async delete({ id }) {
        return await this.lectureCategoriesRepository.delete({
            id: id
        });
    }
};
CategoryService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.LectureCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map