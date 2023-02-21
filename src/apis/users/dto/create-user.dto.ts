import { USER_ENUM } from "../entities/user.entity";

export class CreateUserInput {
  name: string;

  email: string;

  phone: string;

  password: string;

  role: USER_ENUM;

  imageUser : string;
}
