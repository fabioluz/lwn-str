'use client'

import { useState } from "react"

export interface SearchProps {
  onSearchPeople: (name: string) => void
}

export default function Search({ onSearchPeople }: SearchProps) {
  const [query, setQuery] = useState('');
  const [searchOption, setSearchOption] = useState('people');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchPeople(query);
  }

  const handleSearchOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(event.target.value);
  };

  return (
    <div className="flex-1 p-[30px] bg-white rounded-md border border-solid border-slate-50 shadow">
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium mb-[20px]" htmlFor="inputField">
          What are you searching for?
        </label>

        <div className="flex items-center mb-[20px]">
          <label htmlFor="people" className="text-sm font-semibold mr-6">
            <input
              type="radio"
              id="people"
              name="searchOptions"
              className="mr-2"
              value="people"
              checked={searchOption === 'people'}
              onChange={handleSearchOptionChange}/>
            People
          </label>

          <label htmlFor="movies" className="text-sm font-semibold">
            <input
              type="radio"
              id="movies"
              name="searchOptions"
              className="mr-2"
              value="movies"
              checked={searchOption === 'movies'}
              onChange={handleSearchOptionChange} />
            Movies
          </label>
        </div>

        <input
          type="text"
          placeholder={searchOption === 'people' ? "e.g. Chewbacca, Yoda, Boba Fett" : "e.g. A New Hope, The Empire Strikes Back"}
          className="font-semibold text-sm border border-solid w-full rounded-md px-2 h-10 shadow-inner mb-[20px]"
          value={query}
          onChange={handleChange} />

        <button
          type="submit"
          className="bg-green-teal hover:bg-emerald text-white font-semibold text-sm uppercase px-4 py-2 rounded-full w-full">
            Search
        </button>
      </form>
    </div>
  )
}