import { Ticket } from 'src/tickets/entities/ticket.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text', {
    unique: true,
  })
  email!: string;

  @Column('text', {
    select: false,
  })
  password!: string;

  @Column('text')
  fullName!: string;

  @Column('bool', {
    default: true,
  })
  isActive!: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles!: string[];

  @OneToMany(() => Ticket, (ticket) => ticket.createdBy)
  tickets?: Ticket[];

  @BeforeInsert()
  chekFieldBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  chekFieldBeforeUpdate() {
    this.chekFieldBeforeInsert();
  }
}
