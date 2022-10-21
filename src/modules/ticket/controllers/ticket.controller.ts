import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";

@ApiTags('tickets')
@Controller({
  path: 'tickets',
})

export class TicketController {

}
