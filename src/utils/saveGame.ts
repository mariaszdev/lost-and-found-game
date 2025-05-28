import { GameState } from '@/types/GameState';

export const saveGameState = (state: GameState) => {
  if (typeof document === 'undefined') return;
  document.cookie = `lostGameState=${encodeURIComponent(
    JSON.stringify(state)
  )}; path=/; max-age=86400`; // expires in 24h
};

export const loadGameState = (): GameState | null => {
  if (typeof document === 'undefined') return null;
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith('lostGameState='));
  if (!cookie) return null;

  try {
    return JSON.parse(decodeURIComponent(cookie.split('=')[1])) as GameState;
  } catch {
    return null;
  }
};

export const clearGameState = () => {
  if (typeof document !== 'undefined') {
    document.cookie = 'lostGameState=; path=/; max-age=0';
  }
};
