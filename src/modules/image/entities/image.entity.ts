import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../../../core/class/base-entity";

@Entity('image')
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name: 'label', type: 'varchar', length: 255})
    label: string;

    @Column({name: 'path', type: 'varchar', length: 255})
    path: string;

    constructor(dto?: Partial<Image>) {
        super();
        Object.assign(this, dto);
    }
}
