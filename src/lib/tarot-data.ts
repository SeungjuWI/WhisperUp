import type { TarotCard } from '@/types';

// Card identity = stable id + universal symbol. Translatable name + meaning
// live in messages/*.json under tarot.cards.{id}.{name|meaning}. Tarot reading
// variants live under tarot.readings.{topic} (array of HTML-emphasis strings).
export const CARDS: readonly TarotCard[] = [
  { id: 'tower', symbol: '⚡' },
  { id: 'wheel', symbol: '☸️' },
  { id: 'star', symbol: '⭐' },
  { id: 'world', symbol: '🌍' },
  { id: 'fool', symbol: '🌟' },
  { id: 'hermit', symbol: '🕯️' },
  { id: 'sun', symbol: '☀️' },
  { id: 'moon', symbol: '🌙' },
  { id: 'emperor', symbol: '👑' },
  { id: 'chariot', symbol: '⚔️' },
  { id: 'strength', symbol: '🦁' },
  { id: 'priestess', symbol: '🌀' },
] as const;

export const MAX_CARDS = 3;
