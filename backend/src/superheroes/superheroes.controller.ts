import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
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

  @Put(':name')
  update(
    @Param('name') name: string,
    @Body() updateSuperheroDto: Superhero,
  ): Superhero {
    return this.superheroesService.updateSuperhero(name, updateSuperheroDto);
  }

  @Delete(':name')
  delete(@Param('name') name: string): Superhero[] {
    return this.superheroesService.deleteSuperhero(name);
  }
}
