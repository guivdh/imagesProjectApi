import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "../../../core/class/base-entity";
import {User} from "../../user/entities/user.entity";
import {Image} from "../../image/entities/image.entity";
import {Publication} from "../../publication/entities/publication.entity";

@Entity('comment')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: 'description', type: 'text' })
    comment: string;

    @ManyToOne(() => Publication)
    @JoinColumn({ name: 'publicationId' })
    publication: Publication;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    constructor(dto?: Partial<Comment>) {
        super();
        Object.assign(this, dto);
    }
}
