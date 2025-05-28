'use client';

import React, { useState } from 'react';

import Rooms from '@/components/Rooms';
import StartGamePanel from '@/components/StartGamePanel';
import ItemCard from '@/components/ItemCard';

import items from '@/data/items.json';
import roomsByType from '@/data/rooms.json';
import roomProperties from '../data/roomProperties.json';

import { generateClue } from '@/utils/generateClue';

interface ItemGameData {
  name: string;
  room: string;
  clues: string[];
  clueCount: number;
  guessed: boolean;
  correctGuess?: boolean;
  score: number;
}

interface SelectedRoom {
  type: string;
  displayName: string;
  image: string;
  properties: Record<string, number>;
}

const maxClues = roomProperties.length;

const getGrammar = (itemName: string) => {
  const found = items.find((i) => i.name === itemName);
  const plural = found?.plural ?? false;
  return {
    verb: plural ? 'are' : 'is',
    negVerb: plural ? 'are not' : 'is not',
  };
};

export default function LostItemsGame() {
  const [itemCount, setItemCount] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameItems, setGameItems] = useState<ItemGameData[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([]);

  const startGame = () => {
    // 1. Randomly select one room for each type
    const selectedRoomList: SelectedRoom[] = Object.entries(roomsByType).map(
      ([type, { displayName, rooms }]: any) => {
        const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];
        const { image, ...props } = randomRoom;
        return {
          type,
          displayName,
          image,
          properties: props,
        };
      }
    );

    setSelectedRooms(selectedRoomList);

    // 2. Randomly assign items to those rooms
    const shuffledItems = [...items].sort(() => 0.5 - Math.random());
    const selectedItems = shuffledItems.slice(0, itemCount);
    const assignedItems: ItemGameData[] = selectedItems.map((item) => {
      const randomRoom =
        selectedRoomList[Math.floor(Math.random() * selectedRoomList.length)];
      return {
        name: item.name,
        room: randomRoom.type,
        clues: [],
        clueCount: 0,
        guessed: false,
        score: 10,
      };
    });

    console.log('🎯 Item locations:');
    assignedItems.forEach((item) => {
      console.log(`${item.name} → ${item.room}`);
    });

    setGameItems(assignedItems);
    setGameStarted(true);
  };

  const handleGetClue = (itemIndex: number) => {
    setGameItems((prevItems) => {
      const updatedItems = [...prevItems];
      const currentItem = updatedItems[itemIndex];
      const targetRoom = selectedRooms.find((r) => r.type === currentItem.room);
      if (!targetRoom || currentItem.correctGuess) return prevItems;

      let newClue = '';
      const existingClues = new Set(currentItem.clues);
      let attempts = 0;
      do {
        newClue = generateClue(currentItem.name, targetRoom);
        attempts++;
      } while (existingClues.has(newClue) && attempts < 100);

      if (!existingClues.has(newClue)) {
        updatedItems[itemIndex] = {
          ...currentItem,
          clues: [...currentItem.clues, newClue],
          clueCount: currentItem.clueCount + 1,
          score: currentItem.score - 1,
        };
      }
      return updatedItems;
    });
  };

  const handleGuess = (itemIndex: number, selectedRoom: string) => {
    setGameItems((prevItems) => {
      const updatedItems = [...prevItems];
      const currentItem = updatedItems[itemIndex];
      const isCorrect = currentItem.room === selectedRoom;

      const { verb, negVerb } = getGrammar(currentItem.name);

      const feedback = isCorrect
        ? `✅ The <strong>${currentItem.name}</strong> ${verb} in the <strong>${selectedRoom}</strong>.`
        : `❌ The <strong>${currentItem.name}</strong> ${negVerb} in the <strong>${selectedRoom}</strong>.`;

      updatedItems[itemIndex] = {
        ...currentItem,
        guessed: isCorrect,
        correctGuess: isCorrect,
        clues: [...currentItem.clues, feedback],
        score: isCorrect ? currentItem.score : currentItem.score - 10,
      };

      return updatedItems;
    });
  };

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
            <Rooms rooms={selectedRooms} />
          </div>
        )}
      </div>
    </div>
  );
}
