import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from '../../../core/class/base-entity';
import {ParameterCategory} from './parameter-category.entity';


@Entity('parameters')
export class Parameter extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: 'logic_value', type: 'varchar', length: 50 })
  logicValue: string;

  @Column({ name: 'label_fr', type: 'varchar', length: 50 })
  labelFr: string;

  @Column({ name: 'is_active', type: 'boolean' })
  isActive: boolean;

  @ManyToOne(() => ParameterCategory)
  @JoinColumn({ name: 'parameter_category_id' })
  parameterCategory: ParameterCategory;

  constructor(dto?: Partial<Parameter>) {
    super();
    Object.assign(this, dto);
  }
}
