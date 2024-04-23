'use client'

import { useEffect, useState } from 'react';
import * as Movies from '../../../features/movies/service';
import Link from 'next/link';

export default function Person({ params }: {
  params: { id: number }
}) {

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<Movies.Model | undefined>();

  useEffect(() => {
    const getPerson = async () => {
      const movie = await Movies.get(params.id, true);
      setMovie(movie);
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
      { movie && (

        <div className="flex flex-col">
          <div className="text-lg font-semibold mb-[30px]">
            {movie.title}
          </div>

          <div className="flex min-h-[260px] mb-[30px]">
            <Opening movie={movie}></Opening>
            <Characters movie={movie}></Characters>
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

function Opening({movie}: {movie: Movies.Model}) {
  return (
    <div className="flex-1 mr-[100px]">
      <div className="font-semibold border-b pb-2 mb-[5px] border-pinkish-grey">
        Details
      </div>
      <div className="text-sm">
        <p>{movie.opening_crawl}</p>
      </div>
  </div>
  );
}

function Characters({movie}: {movie: Movies.Model}) {
  return (
    <div className="flex-1">
      <div className="font-semibold border-b pb-2 mb-[5px] border-pinkish-grey">
        Characters
      </div>
      <div className="text-sm">
        {movie.chars.map((char, index) => (
          <>
            <Link key={index} className="text-azure underline" href={`/people/${char.id}`}>
              {char.name}
            </Link>
            {index < movie.chars.length - 1 && ','}
          </>
        ))}
      </div>
    </div>
  )
}