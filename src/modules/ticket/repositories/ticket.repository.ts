import { EntityRepository, Repository } from "typeorm";
import { Ticket } from "../entities/ticket.entity";

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {

}
