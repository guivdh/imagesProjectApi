import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../../../core/class/base-entity";
import {User} from "../../user/entities/user.entity";
import {Image} from "../../image/entities/image.entity";
import {Address} from "../../address/entities/address.entity";

@Entity('establishment')
export class Establishment extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: 'name', type: 'varchar', length: 255 })
    name: string;

    @Column({ name: 'description', type: 'varchar', length: 255 })
    description: string;

    @ManyToOne(() => Image)
    @JoinColumn({ name: 'imageId' })
    image: Image;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    createdBy: User;

    @ManyToOne(() => Address)
    @JoinColumn({ name: 'addressId' })
    address: Address;

    constructor(dto?: Partial<Establishment>) {
        super();
        Object.assign(this, dto);
    }
}
