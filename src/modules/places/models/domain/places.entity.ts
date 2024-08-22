import { Areas } from 'src/modules/areas/models/domain/areas.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('places', { synchronize: false })
export class Places {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  area_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Areas, (area) => area.places)
  @JoinColumn({ name: 'area_id' })
  area: Areas;

}


