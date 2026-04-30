import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { MAX_CARDS } from '@/lib/tarot-data';
import type {
  FunnelStep,
  TarotCard,
  Topic,
} from '@/types';

type LoadingState = { active: boolean; text: string };

type FunnelState = {
  topic: Topic | null;
  selectedCards: TarotCard[];
  isPaid: boolean;
  currentStep: FunnelStep;
  loading: LoadingState;
};

type FunnelActions = {
  setTopic: (topic: Topic) => void;
  selectCard: (card: TarotCard) => void;
  markPaid: () => void;
  setStep: (step: FunnelStep) => void;
  showLoading: (text: string) => void;
  hideLoading: () => void;
  reset: () => void;
};

const initialState: FunnelState = {
  topic: null,
  selectedCards: [],
  isPaid: false,
  currentStep: 0,
  loading: { active: false, text: '' },
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
            s.selectedCards.some((c) => c.id === card.id)
              ? s
              : { selectedCards: [...s.selectedCards, card] },
          false,
          'selectCard',
        ),
      markPaid: () => set({ isPaid: true }, false, 'markPaid'),
      setStep: (currentStep) => set({ currentStep }, false, 'setStep'),
      showLoading: (text) => set({ loading: { active: true, text } }, false, 'showLoading'),
      hideLoading: () =>
        set({ loading: { active: false, text: '' } }, false, 'hideLoading'),
      reset: () => set(initialState, false, 'reset'),
    }),
    { name: 'funnel-store' },
  ),
);
