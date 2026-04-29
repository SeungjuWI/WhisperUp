import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { MAX_CARDS } from '@/lib/tarot-data';
import type {
  City,
  Field,
  FunnelStep,
  TarotCard,
  Topic,
  Years,
} from '@/types';

type FunnelState = {
  topic: Topic | null;
  selectedCards: TarotCard[];
  reading: string | null;
  isPaid: boolean;
  field: Field | null;
  years: Years | null;
  city: City | null;
  salary: number | null;
  resultPct: number | null;
  leadSubmitted: boolean;
  currentStep: FunnelStep;
};

type FunnelActions = {
  setTopic: (topic: Topic) => void;
  selectCard: (card: TarotCard) => void;
  setReading: (reading: string) => void;
  markPaid: () => void;
  setField: (field: Field) => void;
  setYears: (years: Years) => void;
  setCity: (city: City) => void;
  setSalary: (salary: number) => void;
  setResult: (pct: number) => void;
  markLeadSubmitted: () => void;
  setStep: (step: FunnelStep) => void;
  reset: () => void;
};

const initialState: FunnelState = {
  topic: null,
  selectedCards: [],
  reading: null,
  isPaid: false,
  field: null,
  years: null,
  city: null,
  salary: null,
  resultPct: null,
  leadSubmitted: false,
  currentStep: 0,
};

export const useFunnelStore = create<FunnelState & FunnelActions>()(
  devtools(
    (set) => ({
      ...initialState,
      setTopic: (topic) => set({ topic }, false, 'setTopic'),
      selectCard: (card) =>
        set(
          (s) =>
            s.selectedCards.length >= MAX_CARDS ||
            s.selectedCards.some((c) => c.name === card.name)
              ? s
              : { selectedCards: [...s.selectedCards, card] },
          false,
          'selectCard',
        ),
      setReading: (reading) => set({ reading }, false, 'setReading'),
      markPaid: () => set({ isPaid: true }, false, 'markPaid'),
      setField: (field) => set({ field }, false, 'setField'),
      setYears: (years) => set({ years }, false, 'setYears'),
      setCity: (city) => set({ city }, false, 'setCity'),
      setSalary: (salary) => set({ salary }, false, 'setSalary'),
      setResult: (resultPct) => set({ resultPct }, false, 'setResult'),
      markLeadSubmitted: () => set({ leadSubmitted: true }, false, 'markLeadSubmitted'),
      setStep: (currentStep) => set({ currentStep }, false, 'setStep'),
      reset: () => set(initialState, false, 'reset'),
    }),
    { name: 'funnel-store' },
  ),
);
