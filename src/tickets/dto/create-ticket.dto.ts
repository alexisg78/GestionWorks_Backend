import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

import { ValidStatus, ValidPriority } from '../interfaces';

export class CreateTicketDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  detail!: string;

  @IsEnum(ValidStatus)
  @IsOptional()
  status?: ValidStatus;

  @IsEnum(ValidPriority)
  priority!: ValidPriority;

  @IsUUID()
  @IsOptional()
  assignedUserId?: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}
