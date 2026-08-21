import { IsArray, IsEnum, IsString, IsUUID } from 'class-validator';

import { ValidPriority, ValidStatus } from '../interfaces';

export class TicketResponseDto {
  @IsUUID()
  id!: string;

  @IsString()
  title!: string;

  @IsString()
  detail!: string;

  @IsEnum(ValidStatus)
  status!: ValidStatus;

  @IsEnum(ValidPriority)
  priority!: ValidPriority;

  @IsUUID()
  createdById!: string;

  @IsUUID()
  assignedUserId!: string | null;

  @IsArray()
  @IsString({ each: true })
  images!: string[];
}
