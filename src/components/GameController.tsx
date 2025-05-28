'use client';

import React from 'react';
import Rooms from '@/components/Rooms';
import StartGamePanel from '@/components/StartGamePanel';
import ItemCard from '@/components/ItemCard';
import { useGameController } from '@/hooks/useGameController';
import items from '@/data/items.json';

interface GameControllerProps {
  gameStarted: boolean;
  setGameStarted: (started: boolean) => void;
}

export default function GameController({
  gameStarted,
  setGameStarted,
}: GameControllerProps) {
  const {
    itemCount,
    setItemCount,
    gameItems,
    selectedRooms,
    startGame,
    handleGetClue,
    handleGuess,
    maxClues,
  } = useGameController(setGameStarted);

  const totalScore = gameItems.reduce((acc, item) => acc + item.score, 0);
  const foundCount = gameItems.filter((i) => i.correctGuess).length;

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="max-w-screen-2xl mx-auto px-4">
        {!gameStarted ? (
          <StartGamePanel
            itemCount={itemCount}
            setItemCount={setItemCount}
            maxItems={items.length}
            onStart={startGame}
          />
        ) : (
          <div className="space-y-5">
            <div className="flex justify-center gap-x-6 text-lg text-gray-700 font-medium">
              <div>Points: {totalScore}</div>
              <div>
                🎯 Items found: {foundCount} / {gameItems.length}
              </div>
            </div>

            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              }}
            >
              {gameItems.map((item, index) => (
                <ItemCard
                  key={index}
                  item={item}
                  index={index}
                  onClue={() => handleGetClue(index)}
                  onGuess={(room) => handleGuess(index, room)}
                  selectedRooms={selectedRooms}
                  maxClues={maxClues}
                />
              ))}
            </div>

            <Rooms rooms={selectedRooms} />
          </div>
        )}
      </div>
    </div>
  );
}
