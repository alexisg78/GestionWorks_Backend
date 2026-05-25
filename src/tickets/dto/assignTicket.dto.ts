import { IsNotEmpty, IsUUID } from 'class-validator';

export class AssignTicketDto {
  @IsNotEmpty()
  @IsUUID()
  userId?: string;
}
