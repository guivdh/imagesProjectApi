import {ApiProperty} from "@nestjs/swagger";
import {DTOMapping} from "../../../core/decorators/mapping.decorator";
import {ImageDTO} from "../../image/dto/image.dto";
import {AddressDTO} from "../../address/dto/address.dto";
import {IsNotEmpty, Length} from "class-validator";

export class CreateEstablishmentDTO {
    @ApiProperty()
    @Length(0, 255)
    name: string;

    @ApiProperty()
    @Length(0, 255)
    description: string;

    @ApiProperty()
    @Length(0, 255)
    address: string;

    @ApiProperty()
    @Length(0, 255)
    country: string;

    @ApiProperty()
    @Length(0, 255)
    image: string;
}

