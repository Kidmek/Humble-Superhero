import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';
import { Superhero } from './entities/superhero.entity';
import { BadRequestException } from '@nestjs/common';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [SuperheroesService],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
  });

  it('should create a superhero successfully', () => {
    const hero: Superhero = {
      name: 'IronMan',
      superpower: 'Strength',
      humilityScore: 5,
    };
    expect(controller.create(hero)).toEqual([
      { name: 'IronMan', superpower: 'Strength', humilityScore: 5 },
    ]);
  });

  it('should throw an error if superhero name is already taken', () => {
    const hero: Superhero = {
      name: 'Kidus',
      superpower: 'NodeJS 😄',
      humilityScore: 7,
    };
    controller.create(hero); // First addition should succeed

    expect(() => controller.create(hero)).toThrow(BadRequestException);
  });

  it('should throw an error if humility score is out of range', () => {
    const hero: Superhero = {
      name: 'Flash',
      superpower: 'Speed',
      humilityScore: 15,
    };

    expect(() => controller.create(hero)).toThrow(BadRequestException);
  });

  it('should return superheroes sorted by humilityScore', () => {
    controller.create({
      name: 'Hero1',
      superpower: 'Power1',
      humilityScore: 4,
    });
    controller.create({
      name: 'Hero2',
      superpower: 'Power2',
      humilityScore: 9,
    });
    controller.create({
      name: 'Hero3',
      superpower: 'Power3',
      humilityScore: 6,
    });

    expect(controller.findAll()).toEqual([
      { name: 'Hero2', superpower: 'Power2', humilityScore: 9 },
      { name: 'Hero3', superpower: 'Power3', humilityScore: 6 },
      { name: 'Hero1', superpower: 'Power1', humilityScore: 4 },
    ]);
  });
});
