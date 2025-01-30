import { Controller, Get, Post, Body } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { Superhero } from './entities/superhero.entity';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Post()
  create(@Body() createSuperheroDto: Superhero): Superhero[] {
    return this.superheroesService.addSuperhero(createSuperheroDto);
  }

  @Get()
  findAll() {
    return this.superheroesService.getSuperheroes();
  }
}
