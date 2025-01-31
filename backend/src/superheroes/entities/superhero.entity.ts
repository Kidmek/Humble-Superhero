import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Superhero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Enforce uniqueness on the name field
  name: string;

  @Column()
  superpower: string;

  @Column()
  humilityScore: number;
}
