import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    this.superheroes.push(superhero);
    return this.getSuperheroes();
  }

  getSuperheroes(): Superhero[] {
    return this.superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
  }

  updateSuperhero(name: string, updatedSuperhero: Superhero): Superhero {
    const heroIndex = this.superheroes.findIndex((hero) => hero.name === name);
    if (heroIndex === -1) {
      throw new NotFoundException('Superhero not found');
    }

    if (name !== updatedSuperhero.name) {
      const nameTaken = this.superheroes.some(
        (hero) => hero.name === updatedSuperhero.name,
      );
      if (nameTaken) {
        throw new BadRequestException('Superhero name already taken');
      }
    }

    if (
      updatedSuperhero.humilityScore < 1 ||
      updatedSuperhero.humilityScore > 10
    ) {
      throw new BadRequestException('Humility score must be between 1 and 10');
    }

    this.superheroes[heroIndex] = updatedSuperhero;
    return updatedSuperhero;
  }

  deleteSuperhero(name: string): Superhero[] {
    const heroIndex = this.superheroes.findIndex((hero) => hero.name === name);
    if (heroIndex === -1) {
      throw new NotFoundException('Superhero not found');
    }
    this.superheroes.splice(heroIndex, 1);
    return this.getSuperheroes();
  }
}
