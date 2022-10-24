import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../../../core/class/base-entity";
import {Publication} from "../../publication/entities/publication.entity";

@Entity('rating')
export class Rating extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name: 'taste', type: 'numeric'})
    taste: number;

    @Column({name: 'presentation', type: 'numeric'})
    presentation: number;

    @Column({name: 'quantity', type: 'numeric'})
    quantity: number;

    @Column({name: 'price', type: 'numeric'})
    price: number;

    @Column({name: 'description', type: 'text'})
    description: string;

    @ManyToOne(() => Publication)
    @JoinColumn({name: 'publicationId'})
    image: Publication;

    constructor(dto?: Partial<Rating>) {
        super();
        Object.assign(this, dto);
    }
}
