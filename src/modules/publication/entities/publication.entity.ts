import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../../../core/class/base-entity";
import {User} from "../../user/entities/user.entity";
import {Image} from "../../image/entities/image.entity";
import { Establishment } from "../../establishment/entities/establishment.entity";
import { Like } from "../../like/entities/like.entity";

@Entity('publication')
export class Publication extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: 'dishName', type: 'varchar', length: 255 })
    dishName: string;

    @Column({ name: 'dishType', type: 'varchar', length: 255 })
    dishType: string;

    @Column({ name: 'description', type: 'text' })
    description: string;

    @Column({name: 'taste', type: 'numeric'})
    taste: number;

    @Column({name: 'presentation', type: 'numeric'})
    presentation: number;

    @Column({name: 'quantity', type: 'numeric'})
    quantity: number;

    @Column({name: 'price', type: 'numeric'})
    price: number;

    @ManyToOne(() => Image, {cascade: true})
    @JoinColumn({ name: 'imageId' })
    image: Image;

    @ManyToOne(() => User, {cascade: true})
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Establishment, {cascade: true})
    @JoinColumn({ name: 'establishmentId' })
    establishment: Establishment;

    isLike: boolean;

    constructor(dto?: Partial<Publication>) {
        super();
        Object.assign(this, dto);
    }
}
