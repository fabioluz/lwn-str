import { extractIdFromURL } from "../swapi";
import * as Movies from '../movies/service'

export interface Model {
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
  movies: { title: string; id: number }[];
}

export async function search(name: string): Promise<Model[]> {
  try {
    const response = await fetch(`https://swapi.dev/api/people/?search=${name}`);
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

export async function get(id: number, getMovies?: boolean): Promise<Model | undefined> {
  try {
    const response = await fetch(`https://swapi.dev/api/people/${id}`);
    if (!response.ok) {
      throw new Error('Failed to get people');
    }
    const data = await response.json() as Model;

    // fetch movies
    if (getMovies) {
      const calls = data.films.map(url => Movies.get(extractIdFromURL(url)));
      const movies = await Promise.all(calls);
      data.movies = movies.map(movie => ({ 
        title: movie?.title || '',
        id: movie?.id || 0
      }));
    }
   
    data.id = extractIdFromURL(data.url);
    return data;
  } catch(err) {
    console.error(err);
    return;
  }
}

async function unsafeFetchData(url: string) {
  const response = await fetch(url);
  return response.json();
};
