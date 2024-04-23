import { extractIdFromURL } from "../swapi";

export interface Person {
  id: number;
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export async function search(name: string): Promise<Person[]> {
  try {
    const response = await fetch(`https://swapi.dev/api/people/?search=${name}`);
    if (!response.ok) {
      throw new Error('Failed to search people');
    }
    const data = await response.json();
    return data.results.map((x: Person) => ({...x, id: extractIdFromURL(x.url) }));
  } catch(err) {
    console.error(err);
    return [];
  }
}