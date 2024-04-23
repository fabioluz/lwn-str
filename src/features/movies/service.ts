import { extractIdFromURL } from "../swapi";
import * as People from '../people/service'

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
  chars: {name: string; id: number}[];
}

export async function search(name: string): Promise<Model[]> {
  try {
    const response = await fetch(`https://swapi.dev/api/films/?search=${name}`);
    if (!response.ok) {
      throw new Error('Failed to search movies');
    }
    const data = await response.json();
    return data.results.map((x: Model) => ({...x, id: extractIdFromURL(x.url) }));
  } catch(err) {
    console.error(err);
    return [];
  }
}

export async function get(id: number, getChars?: boolean): Promise<Model | undefined> {
  try {
    const response = await fetch(`https://swapi.dev/api/films/${id}`);
    if (!response.ok) {
      throw new Error('Failed to get movie');
    }
    const data = await response.json() as Model;
   
    // fetch characters
    if (getChars) {
      const calls = data.characters.map(url => People.get(extractIdFromURL(url)));
      const chars = await Promise.all(calls);
      data.chars = chars.map(char => ({ 
        name: char?.name || '',
        id: char?.id || 0
      }));
    }

    data.id = extractIdFromURL(data.url);
    return data;
  } catch(err) {
    console.error(err);
    return;
  }
}