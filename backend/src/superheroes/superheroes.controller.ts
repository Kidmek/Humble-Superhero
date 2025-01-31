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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

@ApiTags('superheroes')
@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Post()
  @ApiBody({ type: CreateSuperheroDto })
  create(@Body() createSuperheroDto: CreateSuperheroDto): Promise<string> {
    return this.superheroesService.addSuperhero(createSuperheroDto);
  }

  @Get()
  findAll(): Promise<Superhero[]> {
    return this.superheroesService.getSuperheroes();
  }

  @Put(':id')
  @ApiBody({ type: CreateSuperheroDto })
  update(
    @Param('id') id: number,
    @Body() updateSuperheroDto: CreateSuperheroDto,
  ): Promise<string> {
    return this.superheroesService.updateSuperhero(id, updateSuperheroDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<string> {
    return this.superheroesService.deleteSuperhero(id);
  }
}
