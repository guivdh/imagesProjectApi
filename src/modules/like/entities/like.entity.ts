import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../../../core/class/base-entity";
import {Image} from "../../image/entities/image.entity";
import {User} from "../../user/entities/user.entity";
import {Publication} from "../../publication/entities/publication.entity";

@Entity('like')
export class Like extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Publication)
    @JoinColumn({ name: 'publicationId' })
    publication: Publication;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    constructor(dto?: Partial<Like>) {
        super();
        Object.assign(this, dto);
    }
}
