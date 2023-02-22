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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async fetchAll() {
        const result = await this.userRepository.find();
        return result;
    }
    async fetch({ id }) {
        const result = await this.userRepository.findOne({
            where: { id: id }
        });
        return result;
    }
    async findUserByEmail({ email }) {
        const result = await this.userRepository.findOne({
            where: { email: email }
        });
        return result;
    }
    async create({ createUserInput }) {
        const { email, password } = createUserInput, rest = __rest(createUserInput, ["email", "password"]);
        const user = await this.userRepository.findOne({ where: { email } });
        if (user)
            throw new common_1.ConflictException('이미 가입된 이메일입니다');
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await this.userRepository.save(Object.assign({ email, password: hashedPassword }, rest));
        return result;
    }
    async update({ id, updateUserInput }) {
        const user = __rest(updateUserInput, []);
        const result = await this.userRepository.save(Object.assign({ id: id }, user));
        return result;
    }
    async delete({ id }) {
        return await this.userRepository.delete({
            id: id
        });
    }
};
UserService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map