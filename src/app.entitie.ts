import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  indexNumber: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  specialization: string;

  @Column({ type: 'float' })
  avg: number;

  @Column({ nullable: false, default: 1 })
  semester: number;

  @Column({ default: false })
  remote: boolean;
}
