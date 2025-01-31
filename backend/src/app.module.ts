import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Superhero } from './superheroes/entities/superhero.entity';
import { SuperheroesModule } from './superheroes/superheroes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Superhero], // no need for matchers since we have only one entity
      synchronize: true,
    }),
    SuperheroesModule,
  ],
})
export class AppModule {}
