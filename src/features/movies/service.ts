import { extractIdFromURL } from "../swapi";

export interface Model {
  id: number;
  characters: string[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  title: string;
  url: string;
  vehicles: string[];
}

export async function search(name: string): Promise<Model[]> {
  try {
    const response = await fetch(`https://swapi.dev/api/films/?search=${name}`);
    if (!response.ok) {
      throw new Error('Failed to search people');
    }
    const data = await response.json();
    return data.results.map((x: Model) => ({...x, id: extractIdFromURL(x.url) }));
  } catch(err) {
    console.error(err);
    return [];
  }
}