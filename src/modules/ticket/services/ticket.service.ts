import { Injectable } from "@nestjs/common";
import { RepositoryService } from "../../../core/services/repository.service";
import { Parameter } from "../../parameter/entities/parameter.entity";
import { ParameterRepository } from "../../parameter/repositories/parameter.repository";
import { Ticket } from "../entities/ticket.entity";
import { TicketRepository } from "../repositories/ticket.repository";

@Injectable()
export class TicketService extends RepositoryService<Ticket> {
  constructor(
    protected readonly repo: TicketRepository,
  ) {
    super(repo);
  }
}
