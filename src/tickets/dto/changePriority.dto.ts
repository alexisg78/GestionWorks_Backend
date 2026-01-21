import { IsEnum } from "class-validator";
import { ValidPriority } from "../interfaces/valid-priority.js";


export class ChangePriorityDto {

  @IsEnum(ValidPriority)
  priority: ValidPriority

}