import { BaseEntity } from "../../../core/class/base-entity";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Parameter } from "../../parameter/entities/parameter.entity";
import { User } from "../../user/entities/user.entity";

@Entity('tickets')
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: 'ticketTitle', type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'ticketDescription', type: 'text' })
  description: string;

  @ManyToOne(() => Parameter)
  @JoinColumn({ name: 'ticketStatusId' })
  status: Parameter;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ticketCreatedByUserId' })
  createdBy: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ticketModifiedByUserId' })
  modifiedBy: User;

  @Column({ name: 'ticketCreatedAt', type: 'date' })
  createdAt: Date;

  @Column({ name: 'ticketModifiedAt', type: 'date' })
  modifiedAt: Date;

  constructor(dto?: Partial<Ticket>) {
    super();
    Object.assign(this, dto);
  }
}
