import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { isUUID } from 'class-validator';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

import { Ticket } from './entities/ticket.entity';
import { TicketImage } from './entities/ticket-Image.entity';
import { AssignTicketDto } from './dto/assignTicket.dto.js';
import { ChangePriorityDto } from './dto/changePriority.dto.js';


@Injectable()
export class TicketService {
  
  private readonly logger = new Logger('TicketService');

  constructor(
  
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,

    @InjectRepository(TicketImage)
    private readonly ticketImageRepository: Repository<TicketImage>,

    private readonly dataSource: DataSource
  
  ){}
  
  async create(createTicketDto: CreateTicketDto) {
    
    try {

      const { images= [], ...ticketDetails } = createTicketDto;

      const ticket = this.ticketRepository.create({
        ...ticketDetails,
        images: images.map( (image) => this.ticketImageRepository.create({ url: image }) )
      });

      await this.ticketRepository.save( ticket );
      
      return { ...ticket, images }

    } catch (error) {
      
     this.handleDbExeptions( error );
    
    }
  }

  async findAll( paginationDto : PaginationDto) {
    
    const { limit= 10, offset= 0 } = paginationDto

    const tickets = await this.ticketRepository.find({
      
      take: limit,
      skip: offset,
      relations: {
        images: true
      }


    })

    return tickets.map( ( ticket ) => ({
      ...ticket,
      images: ticket.images?.map( img => img.url )
    }))
  
  }

  async findOne(term: string) {
    
    let ticket: Ticket | null = null;

    if ( isUUID(term) ) {
      ticket = await this.ticketRepository.findOneBy({ id: term });
    }else{
      
      const queryBuilder= this.ticketRepository.createQueryBuilder('ticket')

      ticket = await queryBuilder
        .where(`lower(title) =:title`, {
          title: term.toLowerCase(),
        })
        .leftJoinAndSelect('ticket.images', 'ticketImages')
        .getOne()

    }

    if ( !ticket )
      throw new NotFoundException(`Ticket with ${term} not found`);

    return ticket
  
  }

  async findOnePlain( term: string ) {

    const { images= [], ...restTicket } = await this.findOne( term );

    return {
      ...restTicket,
      images: images.map( img => img.url )
    }

  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    
    const { images, ...toUpdate } = updateTicketDto

    const ticket = await this.ticketRepository.preload({ id: id, ...toUpdate });
    
    if ( !ticket ) throw new NotFoundException(`Ticket whit id: ${id} not found`)
    
    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction()

    try {  
      
      if ( images ) {
        
        await queryRunner.manager.delete( TicketImage, { ticket: id } )
        
        ticket.images = images?.map( 
          image => this.ticketImageRepository.create({ url: image }) 
        )
      
      }

      // await this.ticketRepository.save( ticket )
      await queryRunner.manager.save( ticket );
      
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain( id );

    } catch (error) {
      
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.handleDbExeptions( error );

    }

  }

  async remove(id: string ) {
    const ticket = await this.findOne( id );
    await this.ticketRepository.remove( ticket );

  }

  async close(id: string){

  }

  async reopen(id: string){

  }

  async assign(id: string, idAssign: AssignTicketDto){

  }

  async changePriority(id: string, priority: ChangePriorityDto){

  }

  async deletAllTickets() {
    const query = await this.ticketRepository.createQueryBuilder('ticket');

    try {
      return await query
        .delete()
        .where({})
        .execute()

    } catch (error) {
      this.handleDbExeptions(error);
    }
  }

  private handleDbExeptions( error: any ){

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error.message);
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }


}
