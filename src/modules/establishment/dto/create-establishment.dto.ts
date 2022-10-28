import {ApiProperty} from "@nestjs/swagger";
import {DTOMapping} from "../../../core/decorators/mapping.decorator";
import {ImageDTO} from "../../image/dto/image.dto";
import {AddressDTO} from "../../address/dto/address.dto";
import {IsEmail, IsNotEmpty, Length} from "class-validator";
import {Image} from "../../image/entities/image.entity";
import {Address} from "../../address/entities/address.entity";

export class CreateEstablishmentDTO {
    @ApiProperty()
    @IsNotEmpty()
    @Length(0, 255)
    name: string;

    @ApiProperty()
    @Length(0, 255)
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(0, 255)
    street: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(0, 255)
    country: string;

    @ApiProperty()
    image: Image;

    @ApiProperty()
    address: Address;
}

