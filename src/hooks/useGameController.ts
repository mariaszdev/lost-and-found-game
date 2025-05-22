import { useEffect, useState } from 'react';
import items from '@/data/items.json';
import roomsByType from '@/data/rooms.json';
import { generateClue } from '@/utils/generateClue';
import { loadGameState, saveGameState } from '@/utils/saveGame';
import roomProperties from '@/data/roomProperties.json';

export interface ItemGameData {
  name: string;
  room: string;
  clues: string[];
  clueCount: number;
  guessed: boolean;
  correctGuess?: boolean;
  score: number;
}

export interface SelectedRoom {
  type: string;
  displayName: string;
  image: string;
  properties: Record<string, number>;
}

const maxClues = roomProperties.length;

export function useGameController(setGameStarted: (started: boolean) => void) {
  const [itemCount, setItemCount] = useState(4);
  const [gameItems, setGameItems] = useState<ItemGameData[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([]);

  useEffect(() => {
    const saved = loadGameState();
    if (saved) {
      setItemCount(saved.itemCount || 5);
      setSelectedRooms(saved.selectedRooms || []);
      setGameItems(saved.gameItems || []);
      setGameStarted(true);
    }
  }, []);

  const startGame = () => {
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

    setSelectedRooms(selectedRoomList);
    setGameItems(assignedItems);
    setGameStarted(true);

    saveGameState({
      itemCount,
      gameItems: assignedItems,
      selectedRooms: selectedRoomList,
    });
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
        saveGameState({
          itemCount,
          gameItems: updatedItems,
          selectedRooms,
        });
      }

      return updatedItems;
    });
  };

  const handleGuess = (itemIndex: number, selectedRoom: string) => {
    setGameItems((prevItems) => {
      const updatedItems = [...prevItems];
      const currentItem = updatedItems[itemIndex];
      const isCorrect = currentItem.room === selectedRoom;

      const verb = items.find((i) => i.name === currentItem.name)?.plural
        ? 'are'
        : 'is';
      const negVerb = verb === 'are' ? 'are not' : 'is not';

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

      saveGameState({
        itemCount,
        gameItems: updatedItems,
        selectedRooms,
      });

      return updatedItems;
    });
  };

  return {
    itemCount,
    setItemCount,
    gameItems,
    selectedRooms,
    startGame,
    handleGetClue,
    handleGuess,
    maxClues,
  };
}
