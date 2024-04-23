'use client'

import Search from "./_components/search";
import { ResultItem, Results } from "./_components/results";
import { useState } from "react";
import * as People from '../features/people/service';
import * as Movies from '../features/movies/service';

export default function Home() {

  const [items, setItems] = useState<ResultItem[]>([]);

  const [searching, setSearching] = useState(false);

  const searchPeople = async (name: string) => {
    try {
      setSearching(true);
      const result = await People.search(name);
      const people = result.map(x => ({name: x.name, url: `/people/${x.id}`}));
      setItems(people);
    } finally {
      setSearching(false);
    }
  }

  const searchMovies = async (name: string) => {
    try {
      setSearching(true);
      const result = await Movies.search(name);
      const movies = result.map(x => ({name: x.title, url: `/movies/${x.id}`}));
      setItems(movies);
    } finally {
      setSearching(false);
    }
  }

  return (
    <main className="flex h-screen flex-col items-center justify-between p-24 font-sans">
      <div className="flex">
        <div className="w-[410px] mr-6">
          <Search
            searching={searching}
            onSearchPeople={searchPeople}
            onSearchMovies={searchMovies}>
          </Search>
        </div>
        <div className="w-[582px]">
          <Results items={items} searching={searching}></Results>
        </div>
      </div>
    </main>
  );
}
