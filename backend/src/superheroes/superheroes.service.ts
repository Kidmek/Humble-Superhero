import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Superhero } from './entities/superhero.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

@Injectable()
export class SuperheroesService {
  constructor(
    @InjectRepository(Superhero)
    private superheroRepository: Repository<Superhero>,
  ) {}

  // Helper method to check if a superhero name is already taken
  private async isNameTaken(name: string, id?: number): Promise<boolean> {
    const foundSuperHero = await this.superheroRepository.findOne({
      where: { name },
    });

    if (!foundSuperHero) {
      return false;
    } else {
      if (id) {
        return foundSuperHero.id !== id;
      } else {
        return true;
      }
    }
  }

  async addSuperhero(superhero: CreateSuperheroDto): Promise<string> {
    // Check if the superhero name is already taken
    if (await this.isNameTaken(superhero.name)) {
      throw new BadRequestException('Superhero name already taken');
    }

    // Validate humility score
    if (superhero.humilityScore < 1 || superhero.humilityScore > 10) {
      throw new BadRequestException('Humility score must be between 1 and 10');
    }

    // Save the new superhero to the database
    await this.superheroRepository.save(superhero);

    // Return all superheroes sorted by humility score
    return 'Saved succesfully';
  }

  async getSuperheroes(): Promise<Superhero[]> {
    // Fetch all superheroes from the database and sort by humility score
    return this.superheroRepository.find({
      order: { humilityScore: 'DESC' },
    });
  }

  async updateSuperhero(
    id: number,
    updatedSuperhero: CreateSuperheroDto,
  ): Promise<string> {
    // Find the superhero by id
    const superhero = await this.superheroRepository.findOne({
      where: { id },
    });
    if (!superhero) {
      throw new NotFoundException('Superhero not found');
    }

    // Check if the new name is already taken (if the name is being updated)
    if (updatedSuperhero.name && superhero.name !== updatedSuperhero.name) {
      if (await this.isNameTaken(updatedSuperhero.name, id)) {
        throw new BadRequestException('Superhero name already taken');
      }
    }

    // Validate humility score
    if (
      updatedSuperhero.humilityScore < 1 ||
      updatedSuperhero.humilityScore > 10
    ) {
      throw new BadRequestException('Humility score must be between 1 and 10');
    }

    // Update the superhero
    await this.superheroRepository.update(id, updatedSuperhero);

    // Return the updated superhero
    return 'Updated succesfully';
  }

  async deleteSuperhero(id: number): Promise<string> {
    // Find the superhero by id
    const superhero = await this.superheroRepository.findOne({
      where: { id },
    });
    if (!superhero) {
      throw new NotFoundException('Superhero not found');
    }

    // Delete the superhero
    await this.superheroRepository.delete(id);

    // Return all remaining superheroes sorted by humility score
    return 'Deleted succesfully';
  }
}
