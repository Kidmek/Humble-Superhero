import { ApiProperty } from '@nestjs/swagger';

export class CreateSuperheroDto {
  @ApiProperty({
    example: 'Spiderman',
    description: 'Name of the superhero',
  })
  name: string;

  @ApiProperty({
    example: 'Web-slinging',
    description: 'Superpower of the superhero',
  })
  superpower: string;

  @ApiProperty({
    example: 8,
    description: 'Humility score of the superhero (between 1 and 10)',
    minimum: 1,
    maximum: 10,
  })
  humilityScore: number;
}
