import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import { Ticket } from "./entities/ticket.entity";
import { TicketController } from "./controllers/ticket.controller";
import { TicketRepository } from "./repositories/ticket.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ticket,
      TicketRepository
    ]),
  ],
  controllers: [
    TicketController
  ],
  providers: [
  ],
  exports: [
  ],
})
export class TicketModule {
}
