import { BadRequestException, Injectable } from '@nestjs/common';
import { Superhero } from './entities/superhero.entity';

@Injectable()
export class SuperheroesService {
  private superheroes: Superhero[] = [];

  addSuperhero(superhero: Superhero): Superhero[] {
    const nameTaken = this.superheroes.some(
      (hero) => hero.name === superhero.name,
    );
    if (nameTaken) {
      throw new BadRequestException('Superhero name already taken');
    }
    if (superhero.humilityScore < 1 || superhero.humilityScore > 10) {
      throw new BadRequestException('Humility score must be between 1 and 10');
    }
    const newHero = superhero;
    this.superheroes.push(newHero);
    return this.superheroes;
  }

  getSuperheroes(): Superhero[] {
    return this.superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
  }
}
