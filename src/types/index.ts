export type Topic = 'timing' | 'potential' | 'direction';

export type CardId =
  | 'tower'
  | 'wheel'
  | 'star'
  | 'world'
  | 'fool'
  | 'hermit'
  | 'sun'
  | 'moon'
  | 'emperor'
  | 'chariot'
  | 'strength'
  | 'priestess';

export type TarotCard = {
  id: CardId;
  /** Universal across locales — the emoji is the visual identity. */
  symbol: string;
};

export type FunnelStep = 0 | 1 | 2 | 3 | 4;
