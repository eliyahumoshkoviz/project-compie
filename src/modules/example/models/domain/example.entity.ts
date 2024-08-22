import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('example', { synchronize: false })
export class Example {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  example: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
