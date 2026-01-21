import { IsArray, IsEnum, IsOptional, IsString, MinLength } from "class-validator";

import { ValidStatus, ValidPriority } from "../interfaces";


export class CreateTicketDto {

  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  detail: string;

  @IsEnum(ValidStatus)
  @IsOptional()
  status?: ValidStatus;

  @IsEnum(ValidPriority)
  priority: ValidPriority;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];

}
