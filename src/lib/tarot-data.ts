import type { TarotCard } from '@/types';

// Card identity = stable id + universal symbol. Translatable name, one-line
// meaning, and slot-specific interpretations (situation/energy/outcome) live
// in messages/*.json under tarot.cards.{id}.{name|meaning|interpretations.*}.
// Topic-level closing copy lives under tarot.result.synthesis.{topic}.
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
  { id: 'justice', symbol: '⚖️' },
  { id: 'magician', symbol: '🎩' },
  { id: 'temperance', symbol: '🕊️' },
] as const;

export const MAX_CARDS = 3;
