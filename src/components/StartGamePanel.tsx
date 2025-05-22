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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value, 10);
    setItemCount(isNaN(parsed) ? 1 : parsed);
  };

  const handleBlur = () => {
    if (itemCount < 1) {
      setItemCount(1);
    } else if (itemCount > maxItems) {
      setItemCount(maxItems);
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      <label className="block text-gray-700">
        Number of lost items:
        <input
          type="number"
          value={itemCount}
          min={1}
          max={maxItems}
          step={1}
          onChange={handleChange}
          onBlur={handleBlur}
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
