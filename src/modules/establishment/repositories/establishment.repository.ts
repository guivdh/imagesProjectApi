import {EntityRepository, Repository} from "typeorm";
import {Establishment} from "../entities/establishment.entity";

@EntityRepository(Establishment)
export class EstablishmentRepository extends Repository<Establishment> {

}
