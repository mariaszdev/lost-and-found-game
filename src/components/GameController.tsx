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
    gameOver,
    hasWon,
    totalScore,
  } = useGameController(setGameStarted);

  const foundCount = gameItems.filter((i) => i.correctGuess).length;

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="max-w-screen-2xl mx-auto px-4">
        {gameStarted ? (
          <div className="space-y-5">
            <div className="flex justify-center gap-x-6 text-lg text-gray-700 font-medium">
              <div>
                Points:
                <span className={`${totalScore < 0 ? 'text-red-700' : ''}`}>
                  {' '}
                  {totalScore}
                </span>
              </div>
              <div>
                🎯 Items found: {foundCount} / {gameItems.length}
              </div>
            </div>

            {gameOver &&
              (hasWon ? (
                <div className="text-center text-xl font-semibold text-white bg-emerald-500 p-4 rounded-2xl  shadow-md">
                  🎉 You found all lost items
                  {totalScore > 0
                    ? ` and got ${totalScore} ${
                        totalScore > 1 ? 'points' : 'point'
                      }`
                    : ``}
                  .
                </div>
              ) : (
                <div className="text-center text-xl font-semibold text-white bg-gray-800 p-4 rounded-2xl  shadow-md">
                  😿 You lost! Try again to find them all before running out of
                  points.
                </div>
              ))}

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
                  gameOver={gameOver}
                  totalScore={totalScore}
                />
              ))}
            </div>

            <Rooms rooms={selectedRooms} />
          </div>
        ) : (
          <StartGamePanel
            itemCount={itemCount}
            setItemCount={setItemCount}
            maxItems={items.length}
            onStart={startGame}
          />
        )}
      </div>
    </div>
  );
}
