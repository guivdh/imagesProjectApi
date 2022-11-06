import { TypeOrmModule } from "@nestjs/typeorm";
import { forwardRef, Module } from "@nestjs/common";
import { Publication } from "./entities/publication.entity";
import { PublicationRepository } from "./repositories/publication.repository";
import { PublicationController } from "./controllers/publication.controller";
import { PublicationService } from "./services/publication.service";
import { EstablishmentModule } from "../establishment/establishment.module";
import { LikeModule } from "../like/like.module";
import { LikeService } from "../like/services/like.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Publication,
      PublicationRepository
    ]),
    EstablishmentModule,
    forwardRef(() => LikeModule)
  ],
  controllers: [
    PublicationController
  ],
  providers: [
    PublicationService,
  ],
  exports: [
    PublicationService
  ]
})
export class PublicationModule {
}
