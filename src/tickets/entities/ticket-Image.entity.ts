import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./ticket.entity";


@Entity({name:'ticket_images'})
export class TicketImage {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @ManyToOne(
    () => Ticket,
    (ticket) => ticket.images,
    { nullable: true, onDelete: "CASCADE" }   
  )
  ticket: Ticket

}