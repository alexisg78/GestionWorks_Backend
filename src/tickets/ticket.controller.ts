import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';

import { TicketService } from './ticket.service';
import { User } from 'src/auth/entities/user.entity';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AssignTicketDto } from './dto/assignTicket.dto';
import { ChangePriorityDto } from './dto/changePriority.dto';

import { ValidRoles } from '../auth/interfaces/valid-roles';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  @Auth()
  create(
    @Body() createTicketDto: CreateTicketDto,
    @GetUser() user: User
  ) {
    return this.ticketService.create(createTicketDto, user);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.ticketService.findAll( paginationDto );
  }

  @Get(':term')
  @Auth()
  findOne(@Param('term') term: string) {
 
    // return this.ticketService.findOne(term);
    return this.ticketService.findOnePlain(term);
 
  }

  @Patch(':id')
  @Auth()
  update(
    @Param( 'id', ParseUUIDPipe ) id: string,  
    @Body() updateTicketDto: UpdateTicketDto
  ) {
    return this.ticketService.update( id, updateTicketDto);
  }

  @Delete(':id')
  @Auth( ValidRoles.admin )
  remove(@Param('id', ParseUUIDPipe ) id: string) {
    return this.ticketService.remove(id);
  }

  // Acciones para implementar

  @Patch(':id/close')
  @Auth()
  closeTicket(@Param('id', ParseUUIDPipe) id: string) {
    return this.ticketService.close(id);
  }

  @Patch(':id/reopen')
  @Auth()
  reopenTicket(@Param('id', ParseUUIDPipe) id: string) {
    return this.ticketService.reopen(id);
  }

  @Patch(':id/assign')
  @Auth(ValidRoles.admin)
  assignTicket(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() assignTicketDto: AssignTicketDto,
  ) {
    return this.ticketService.assign(id, assignTicketDto);
  }

  @Patch(':id/priority')
  @Auth()
  changePriority(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changePriorityDto: ChangePriorityDto,
  ) {
    return this.ticketService.changePriority(id, changePriorityDto);
  }


}
