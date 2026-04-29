export type Topic = 'timing' | 'potential' | 'direction';

export type TarotCard = {
  name: string;
  symbol: string;
  meaning: string;
};

export type FunnelStep = 0 | 1 | 2 | 3 | 4 | 5;

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
