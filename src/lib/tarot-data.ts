import type { TarotCard } from '@/types';

// Card identity = stable id + universal symbol + roman numeral.
// Translatable name, one-line meaning, and slot-specific interpretations
// (situation/energy/outcome) live in messages/*.json under
// tarot.cards.{id}.{name|meaning|interpretations.*}.
// Topic-level closing copy lives under tarot.result.synthesis.{topic}.
export const CARDS: readonly TarotCard[] = [
  { id: 'tower', symbol: '⚡', numeral: 'XVI' },
  { id: 'wheel', symbol: '☸️', numeral: 'X' },
  { id: 'star', symbol: '⭐', numeral: 'XVII' },
  { id: 'world', symbol: '🌍', numeral: 'XXI' },
  { id: 'fool', symbol: '🌟', numeral: '0' },
  { id: 'hermit', symbol: '🕯️', numeral: 'IX' },
  { id: 'sun', symbol: '☀️', numeral: 'XIX' },
  { id: 'moon', symbol: '🌙', numeral: 'XVIII' },
  { id: 'emperor', symbol: '👑', numeral: 'IV' },
  { id: 'chariot', symbol: '⚔️', numeral: 'VII' },
  { id: 'strength', symbol: '🦁', numeral: 'VIII' },
  { id: 'priestess', symbol: '🌀', numeral: 'II' },
  { id: 'justice', symbol: '⚖️', numeral: 'XI' },
  { id: 'magician', symbol: '🎩', numeral: 'I' },
  { id: 'temperance', symbol: '🕊️', numeral: 'XIV' },
] as const;

export const MAX_CARDS = 3;
