'use client';

import React from 'react';
import { VscDebugRestart } from 'react-icons/vsc';
import { clearGameState } from '@/utils/saveGame';

export default function RestartButton() {
  const handleRestart = () => {
    clearGameState();
    window.location.reload();
  };

  return (
    <button
      onClick={handleRestart}
      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md shadow cursor-pointer"
    >
      <VscDebugRestart /> Restart
    </button>
  );
}
