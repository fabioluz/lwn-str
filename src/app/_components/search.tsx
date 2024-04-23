'use client'

import { useState } from "react"

export interface SearchProps {
  searching: boolean;
  onSearchPeople: (name: string) => void;
  onSearchMovies: (name: string) => void;
}

export default function Search({ searching, onSearchPeople, onSearchMovies }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('people');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    switch (searchOption) {
      case 'people':
        onSearchPeople(searchTerm);
        break;
      case 'movies':
        onSearchMovies(searchTerm);
        break;
      default:
        throw new Error("unsupported search option");
    }
  }

  const handleSearchOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm('');
    setSearchOption(event.target.value);
  };

  return (
    <div className="flex-1 p-[30px] bg-white rounded-md border border-solid border-gainsboro shadow">
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
          className="font-semibold text-sm border border-solid border-pinkish-grey w-full rounded-md px-2 h-10 shadow-inner placeholder-pinkish-grey mb-[20px] outline-0"
          value={searchTerm}
          onChange={handleChange} />

        <button
          type="submit"
          disabled={searchTerm === ''}
          className="disabled:bg-pinkish-grey bg-green-teal hover:bg-emerald text-white font-semibold text-sm uppercase px-4 py-2 rounded-full w-full">
            {searching ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  )
}