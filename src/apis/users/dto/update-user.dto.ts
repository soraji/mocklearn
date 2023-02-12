import { PartialType } from "@nestjs/swagger";
import { CreateUserInput } from "./create-user.dto";

export class UpdateUserInput extends PartialType(CreateUserInput) {}
