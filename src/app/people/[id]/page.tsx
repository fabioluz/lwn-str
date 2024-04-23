'use client'

import { useEffect, useState } from 'react';
import * as People from '../../../features/people/service';
import Link from 'next/link';

export default function Person({ params }: {
  params: { id: number }
}) {

  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState<People.Model | undefined>();

  useEffect(() => {
    const getPerson = async () => {
      const person = await People.get(params.id, true);
      setPerson(person);
      setLoading(false);
    };

    getPerson();

  }, [params]);

  return (
    <div className="flex flex-col w-[804px] min-h-[420px] p-[30px] bg-white rounded-md border border-solid border-gainsboro shadow">
      {
        loading && (
          <div className="grow flex items-center justify-center">
            <span className="text-sm text-pinkish-grey font-semibold">Loading...</span>
          </div>
        )
      }
      { person && (

        <div className="flex flex-col">
          <div className="text-lg font-semibold mb-[30px]">
            {person.name}
          </div>

          <div className="flex h-[260px]">
            <Details person={person}></Details>
            <Movies person={person}></Movies>
          </div>

          <div className="flex">
            <Link
              href="/"
              className="bg-green-teal hover:bg-emerald text-white font-semibold text-sm uppercase px-4 py-2 rounded-full">
              Back to search
            </Link>
          </div>
        </div>
      )}
      
    </div>
  )
}

function Details({person}: {person: People.Model}) {
  return (
    <div className="flex-1 mr-[100px]">
      <div className="font-semibold border-b pb-2 mb-[5px] border-pinkish-grey">
        Details
      </div>
      <div className="text-sm">
        <p>Birth Year: {person.birth_year}</p>
        <p>Gender: {person.gender}</p>
        <p>Eye Color: {person.eye_color}</p>
        <p>Hair Color: {person.hair_color}</p>
        <p>Height: {person.height}</p>
        <p>Mass: {person.mass}</p>
      </div>
  </div>
  );
}

function Movies({person}: {person: People.Model}) {
  return (
    <div className="flex-1">
      <div className="font-semibold border-b pb-2 mb-[5px] border-pinkish-grey">
        Movies
      </div>
      <div className="text-sm">
        {person.movies.map((movie, index) => (
          <p key={index}>
            <Link className="text-azure underline" href={`/movies/${movie.id}`}>
              {movie.title}
            </Link>
          </p>
        ))}
      </div>
    </div>
  )
}