'use client'

import * as People from '../../features/people/service'

export interface ResultProps {
  items: People.Person[]
  searching: boolean
}

export function Results({items, searching}: ResultProps) {
  return (
    <div className="flex flex-col p-[30px] bg-white rounded-md border border-solid border-slate-50 shadow min-h-[582px]">
      <div className="text-lg font-semibold border-b pb-2.5	border-pinkish-grey">
        Results
      </div>
      { searching
          ? <div className="grow">
              <div className="grid h-full place-items-center justify-center">
                <span className="text-sm text-pinkish-grey font-semibold">Searching...</span>
              </div>
            </div>
          : items.map((item, index) => (
              <div key={index} className="flex justify-between font-semibold border-pinkish-grey border-b items-center h-[55px]">
                <span>{item.name}</span>
                <button className="bg-green-teal hover:bg-emerald text-white font-semibold text-sm uppercase px-4 py-2 rounded-full">
                  See details
                </button>
              </div>
      ))}
    </div>
  );

}