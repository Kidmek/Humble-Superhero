export interface Superhero {
  id?: number;
  name: string;
  superpower: string;
  humilityScore: number;
}

export const API_URL = "http://localhost:3000/superheroes";
