import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../core/class/base-entity';
import { Role } from './role.entity';


@Entity('users')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: 'userFirstName', type: 'varchar', length: 255 })
  firstName: string;

  @Column({ name: 'userLastName', type: 'varchar', length: 255 })
  lastName: string;

  @Column({ name: 'userPseudo', type: 'varchar', length: 255 })
  pseudo: string;

  @Column({ name: 'userPassword', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'userEmail', type: 'varchar', length: 255 })
  email: string;

  @ManyToOne(() => Role, { nullable: true })
  @JoinColumn({ name: 'userRoleId' })
  role: Role;

  constructor(dto?: Partial<User>) {
    super();
    Object.assign(this, dto);
  }
}
