import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {Address} from "./entities/address.entity";
import {AddressRepository} from "./repositories/address.repository";
import {AddressController} from "./controllers/address.controller";
import {AddressService} from "./services/address.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Address,
            AddressRepository
        ]),
    ],
    controllers: [
        AddressController
    ],
    providers: [
        AddressService
    ],
    exports: [],
})
export class AddressModule {
}
