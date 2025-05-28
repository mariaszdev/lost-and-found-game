'use client';

import React from 'react';
import Image from 'next/image';
import { ItemGameData } from '@/hooks/useGameController';

interface ItemCardProps {
  item: ItemGameData;
  index: number;
  onClue: () => void;
  onGuess: (roomType: string) => void;
  selectedRooms: {
    type: string;
    displayName: string;
  }[];
  maxClues?: number;
  gameOver: boolean;
  totalScore: number;
}

export default function ItemCard({
  item,
  onClue,
  onGuess,
  selectedRooms,
  maxClues = 10,
  gameOver,
  totalScore,
}: ItemCardProps) {
  const outOfClues = item.clues.length >= maxClues;
  const noPointsLeft = totalScore === 0;
  const isDisabled = gameOver || noPointsLeft;

  return (
    <div className="flex flex-col h-auto w-full bg-white shadow-md rounded-2xl p-5 border border-gray-200 justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {item.name} {item.correctGuess ? '✅' : '🔍'}
        </h2>

        <ol className="list-decimal pl-5 space-y-1 text-gray-700">
          {item.clues.map((clue, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: clue }} />
          ))}
        </ol>
      </div>
      <div className="mt-4 flex flex-wrap justify-between gap-2 items-center w-full">
        {!item.correctGuess &&
          (outOfClues ? (
            <span className="text-red-600 text-sm font-medium">
              No more clues available
            </span>
          ) : noPointsLeft ? (
            <span className="text-red-600 text-sm font-medium">
              You&apos;re out of points. No more clues.
            </span>
          ) : (
            <button
              onClick={onClue}
              disabled={isDisabled}
              className={`text-white px-2 py-2 rounded-md flex items-center gap-2 bg-emerald-500 ${
                isDisabled
                  ? 'opacity-50'
                  : 'hover:bg-emerald-600 cursor-pointer'
              }`}
            >
              Give me a clue
              <Image
                src="/icons/clue.png"
                alt="Clue"
                width={22}
                height={22}
                className="inline-block align-middle"
              />
            </button>
          ))}

        {!item.correctGuess ? (
          <select
            onChange={(e) => onGuess(e.target.value)}
            defaultValue=""
            disabled={gameOver}
            className={`pl-2 py-2 rounded-md ${
              gameOver
                ? 'bg-gray-200 text-gray-400 border-none'
                : 'border border-gray-400 text-gray-700 cursor-pointer'
            }`}
          >
            <option value="" disabled>
              Guess room
            </option>
            {selectedRooms.map((room) => (
              <option key={room.type} value={room.type}>
                {room.displayName}
              </option>
            ))}
          </select>
        ) : (
          <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
            ✅ Correct!
          </span>
        )}
      </div>
    </div>
  );
}
