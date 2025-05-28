'use client';

import { useState } from 'react';
import Image from 'next/image';
import GameController from './GameController';
import RestartButton from './RestartButton';

export default function GameContainer() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-gray-50 px-6 pt-6">
      <h1 className="absolute top-6 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-gray-800 flex gap-3 items-center">
        <Image
          src="/icons/search-cat-icon.png"
          width={30}
          height={30}
          alt="cat with magnifying glass icon"
        />
        Lost & Found Game
      </h1>

      {gameStarted && (
        <div className="absolute top-6 right-6 z-10">
          <RestartButton />
        </div>
      )}

      <div className="pt-24">
        <GameController
          gameStarted={gameStarted}
          setGameStarted={setGameStarted}
        />
      </div>
    </div>
  );
}
