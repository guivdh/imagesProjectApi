import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../../../core/class/base-entity";
import {User} from "../../user/entities/user.entity";
import {Image} from "../../image/entities/image.entity";

@Entity('country')
export class Country extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: 'label', type: 'varchar', length: 255 })
    label: string;

    constructor(dto?: Partial<Country>) {
        super();
        Object.assign(this, dto);
    }
}
