import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../../../core/class/base-entity";
import {User} from "../../user/entities/user.entity";
import {Image} from "../../image/entities/image.entity";
import {Country} from "../../country/entities/country.entity";
import {CountryController} from "../../country/controllers/country.controller";

@Entity('address')
export class Address extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: 'street', type: 'varchar', length: 255 })
    street: string;

    @ManyToOne(() => Country, {cascade: true})
    @JoinColumn({ name: 'countryId' })
    country: Country;

    constructor(dto?: Partial<Address>) {
        super();
        Object.assign(this, dto);
    }
}
