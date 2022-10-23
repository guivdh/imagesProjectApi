import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../../../core/class/base-entity";
import {User} from "../../user/entities/user.entity";
import {Image} from "../../image/entities/image.entity";
import { Establishment } from "../../establishment/entities/establishment.entity";

@Entity('publication')
export class Publication extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: 'description', type: 'text' })
    description: string;

    @ManyToOne(() => Image)
    @JoinColumn({ name: 'imageId' })
    image: Image;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Establishment)
    @JoinColumn({ name: 'establishmentId' })
    establishment: Establishment;

    constructor(dto?: Partial<Publication>) {
        super();
        Object.assign(this, dto);
    }
}
