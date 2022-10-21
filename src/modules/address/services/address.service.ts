import {Injectable} from "@nestjs/common";
import {RepositoryService} from "../../../core/services/repository.service";
import {Address} from "../entities/address.entity";
import {AddressRepository} from "../repositories/address.repository";

@Injectable()
export class AddressService extends RepositoryService<Address> {
    constructor(
        protected readonly repo: AddressRepository,
    ) {
        super(repo);
    }
}
