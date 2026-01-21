import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';

import { Ticket } from './entities/ticket.entity';
import { TicketImage } from './entities/ticket-Image.entity';

@Module({
  controllers: [TicketController],
  providers: [TicketService],
  imports: [
    TypeOrmModule.forFeature([ Ticket, TicketImage ]),
    AuthModule
  ],
  exports: [ 
    TicketService,
    TypeOrmModule
  ]
})
export class TicketModule {}
