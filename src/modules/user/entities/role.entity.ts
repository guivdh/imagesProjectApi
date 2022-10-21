import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../core/class/base-entity';


@Entity('roles')
export class Role extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  role: string;

  constructor(dto?: Partial<Role>) {
    super();
    Object.assign(this, dto);
  }
}
