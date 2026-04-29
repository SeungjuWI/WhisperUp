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

export type FunnelStep = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Field/Years/City are stored as English literals because they are part of
 * the /api/calculate contract and the Phase 2 Supabase schema. Display labels
 * are looked up via translation keys (see messages/*.json input.* namespaces).
 */
export type Field =
  | 'Engineering'
  | 'Marketing'
  | 'Sales & BD'
  | 'Design & UX'
  | 'Finance'
  | 'HR & Ops';

export type Years =
  | 'Under 1 yr'
  | '1–3 yrs'
  | '3–5 yrs'
  | '5–8 yrs'
  | '8–12 yrs'
  | '12+ yrs';

export type City = 'Hanoi' | 'Ho Chi Minh City' | 'Da Nang' | 'Other';
