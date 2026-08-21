import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { isUUID } from 'class-validator';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AssignTicketDto } from './dto/assignTicket.dto';
import { ChangePriorityDto } from './dto/changePriority.dto';

import { Ticket } from './entities/ticket.entity';
import { TicketImage } from './entities/ticket-Image.entity';
import { User } from 'src/auth/entities/user.entity';
import { TicketResponseDto } from './dto/TicketResponse.dto';

@Injectable()
export class TicketService {
  private readonly logger = new Logger('TicketService');

  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,

    @InjectRepository(TicketImage)
    private readonly ticketImageRepository: Repository<TicketImage>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createTicketDto: CreateTicketDto, user: User) {
    try {
      const { images = [], assignedUserId, ...ticketDetails } = createTicketDto;

      const ticket = this.ticketRepository.create({
        ...ticketDetails,
        createdBy: user,
        assignedUser: assignedUserId ? ({ id: assignedUserId } as User) : null,
        images: images.map((image) =>
          this.ticketImageRepository.create({ url: image }),
        ),
      });

      const dataTicket = await this.ticketRepository.save(ticket);

      return this.findOnePlain(dataTicket.id);
    } catch (error) {
      this.handleDbExeptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const tickets = await this.ticketRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
        createdBy: true,
        assignedUser: true,
      },
    });

    return tickets.map((ticket) => this.toPlainTicket(ticket));
  }

  private toPlainTicket(ticket: Ticket): TicketResponseDto {
    return {
      id: ticket.id,
      title: ticket.title,
      detail: ticket.detail,
      status: ticket.status,
      priority: ticket.priority,
      createdById: ticket.createdBy.id,
      assignedUserId: ticket.assignedUser?.id ?? null,
      images: ticket.images?.map((img) => img.url) ?? [],
    };
  }

  async findOne(term: string) {
    let ticket: Ticket | null = null;

    if (isUUID(term)) {
      ticket = await this.ticketRepository.findOne({
        where: { id: term },
        relations: { images: true, createdBy: true, assignedUser: true },
      });
    } else {
      const queryBuilder = this.ticketRepository.createQueryBuilder('ticket');

      ticket = await queryBuilder
        .where(`lower(title) =:title`, {
          title: term.toLowerCase(),
        })
        .leftJoinAndSelect('ticket.images', 'ticketImages')
        .leftJoinAndSelect('ticket.createdBy', 'createdBy')
        .leftJoinAndSelect('ticket.assignedUser', 'assignedUser')
        .getOne();
    }

    if (!ticket) throw new NotFoundException(`Ticket with ${term} not found`);

    return ticket;
  }

  async findOnePlain(term: string) {
    const ticket = await this.findOne(term);

    return this.toPlainTicket(ticket);
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const { images, ...toUpdate } = updateTicketDto;

    const ticket = await this.ticketRepository.preload({ id: id, ...toUpdate });

    if (!ticket) throw new NotFoundException(`Ticket whit id: ${id} not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (images) {
        await queryRunner.manager.delete(TicketImage, { ticket: id });

        ticket.images = images?.map((image) =>
          this.ticketImageRepository.create({ url: image }),
        );
      }

      // await this.ticketRepository.save( ticket )
      await queryRunner.manager.save(ticket);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      this.handleDbExeptions(error);
    }
  }

  async remove(id: string) {
    const ticket = await this.findOne(id);
    await this.ticketRepository.remove(ticket);
  }

  async assign(id: string, assignTicketDto: AssignTicketDto) {
    // preload para preparar la actualización del ticket.
    // Le pasamos el ID del ticket y construimos el objeto assignedUser con el ID que viene del DTO.
    const ticket = await this.ticketRepository.preload({
      id: id,
      assignedUser: { id: assignTicketDto.userId } as User,
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with id: ${id} not found`);
    }

    try {
      await this.ticketRepository.save(ticket);
      return this.findOnePlain(id); // Devolvemos el ticket actualizado y limpio
    } catch (error) {
      this.handleDbExeptions(error);
    }
  }

  async deletAllTickets() {
    const query = await this.ticketRepository.createQueryBuilder('ticket');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDbExeptions(error);
    }
  }

  private handleDbExeptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    // Error 23503: Foreign key violation (ej. asignar un ticket a un usuario que no existe)
    if (error.code === '23503')
      throw new BadRequestException(
        `Related record not found: ${error.detail}`,
      );

    this.logger.error(error.message);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  // TODO: CLOSE
  async close(id: string) {}

  // TODO: REOPEN
  async reopen(id: string) {}

  // TODO: CHANGEPRIORITY
  async changePriority(id: string, priority: ChangePriorityDto) {}
}
