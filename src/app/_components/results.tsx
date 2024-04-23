'use client'

import Link from "next/link";

export interface ResultItem {
  name: string;
  url: string;
}

export interface ResultProps {
  items: ResultItem[];
  searching: boolean;
}

export function Results({items, searching}: ResultProps) {
  return (
    <div className="flex flex-col p-[30px] bg-white rounded-md border border-solid border-gainsboro shadow min-h-[582px]">
      <div className="text-lg font-semibold border-b pb-2.5	border-pinkish-grey">
        Results
      </div>
      { searching
          ? <div className="grow flex items-center justify-center">
              <span className="text-sm text-pinkish-grey font-semibold">Searching...</span>
            </div>
          : !items.length
          ? <div className="grow flex items-center justify-center">
              <div className="text-sm text-pinkish-grey font-semibold text-center	">
                <p className="break-after-column">There are zero matches.</p>
                <p className="break-after-column">Use the form to search for People or Movies.</p>
              </div>
            </div>
          : items.map((item, index) => (
              <div key={index} className="flex justify-between font-semibold border-pinkish-grey border-b items-center h-[55px]">
                <span>{item.name}</span>
                <Link
                  href={item.url}
                  className="bg-green-teal hover:bg-emerald text-white font-semibold text-sm uppercase px-4 py-2 rounded-full">
                  See details
                </Link>
              </div>
      ))}
    </div>
  );
}