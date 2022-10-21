import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from '../../../core/class/base-entity';

@Entity('parameter_categories')
export class ParameterCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'label_fr', type: 'varchar', length: 50 })
  labelFr: string;

  constructor(dto?: Partial<ParameterCategory>) {
    super();
    Object.assign(this, dto);
  }
}
