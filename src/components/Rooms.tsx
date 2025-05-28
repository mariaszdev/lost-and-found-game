'use client';

import React from 'react';
import Image from 'next/image';

type SelectedRoom = {
  type: string;
  displayName: string;
  image: string;
  properties: Record<string, number>;
};

type RoomsProps = {
  rooms: SelectedRoom[];
};

export default function Rooms({ rooms }: RoomsProps) {
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mt-10">
        {rooms.map((room) => (
          <div
            key={room.type}
            className="flex flex-col items-center justify-end w-[200px] h-[180px] mt-10"
          >
            <Image
              src={`/rooms/${room.image}`}
              alt={room.displayName}
              width={180}
              height={100}
              className="h-auto"
            />
            <span className="mt-lg font-medium text-gray-600 mt-2">
              {room.displayName}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center pt-12">
        <a
          href="https://www.vecteezy.com/members/marcolivolsi04"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300  hover:underline"
        >
          Room graphics from Vecteezy
        </a>
      </div>
    </div>
  );
}
