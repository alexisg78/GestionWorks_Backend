import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TicketImage } from './ticket-Image.entity';

import { ValidStatus, ValidPriority } from '../interfaces';
import { User } from 'src/auth/entities/user.entity';

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'text',
  })
  title!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  detail!: string;

  @Column({
    type: 'enum',
    enum: ValidStatus,
    default: ValidStatus.OPEN,
  })
  status!: ValidStatus;

  @Column({
    type: 'enum',
    enum: ValidPriority,
    default: ValidPriority.low,
  })
  priority!: ValidPriority;

  @ManyToOne(() => User, (user) => user.tickets)
  user?: User;

  // images
  @OneToMany(() => TicketImage, (ticketImage) => ticketImage.ticket, {
    cascade: true,
    eager: true,
  })
  images?: TicketImage[];
}
