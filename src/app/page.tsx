'use client'

import Search from "./_components/search";
import { Results } from "./_components/results";
import { useState } from "react";
import * as People from '../features/people/service';

export default function Home() {

  const [items, setItems] = useState<People.Person[]>([]);

  const [searching, setSearching] = useState(false);

  const searchPeople = async (name: string) => {
    setSearching(true);
    const result = await People.search(name);
    setItems(result);
    setSearching(false);
  }

  return (
    <main className="flex h-screen flex-col items-center justify-between p-24 font-sans">
      <div className="flex">
        <div className="w-[410px] mr-6">
          <Search onSearchPeople={searchPeople}></Search>
        </div>
        <div className="w-[582px]">
          <Results items={items} searching={searching}></Results>
        </div>
      </div>
    </main>
  );
}
