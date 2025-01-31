import { Module } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { SuperheroesController } from './superheroes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Superhero } from './entities/superhero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Superhero])],
  controllers: [SuperheroesController],
  providers: [SuperheroesService],
})
export class SuperheroesModule {}
