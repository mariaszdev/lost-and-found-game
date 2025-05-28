'use client';

import React from 'react';

interface StartGamePanelProps {
  itemCount: number;
  setItemCount: (count: number) => void;
  maxItems: number;
  onStart: () => void;
}

export default function StartGamePanel({
  itemCount,
  setItemCount,
  maxItems,
  onStart,
}: StartGamePanelProps) {
  return (
    <div className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      <label className="block text-gray-700">
        Number of lost items:
        <input
          type="number"
          value={itemCount}
          min={1}
          max={maxItems}
          onChange={(e) =>
            setItemCount(
              Math.max(1, Math.min(maxItems, parseInt(e.target.value))) || 1
            )
          }
          className="ml-2 mt-1 border p-2 w-24 rounded-md shadow-sm"
        />
      </label>

      <button
        onClick={onStart}
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg shadow cursor-pointer"
      >
        Start Game
      </button>
    </div>
  );
}
