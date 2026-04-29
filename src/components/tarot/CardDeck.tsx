'use client';

import { useEffect, useState } from 'react';
import { useFunnelStore } from '@/store/funnel-store';
import { CARDS, MAX_CARDS, READINGS } from '@/lib/tarot-data';
import type { TarotCard as TarotCardType, Topic } from '@/types';
import TarotCard from './TarotCard';

const QUESTION_LABELS: Record<Topic, string> = {
  timing: 'Is now the right time?',
  potential: 'Will things get better?',
  direction: 'Which direction?',
};

const READING_DELAY_MS = 1800;

function shuffle<T>(arr: readonly T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function CardDeck() {
  const topic = useFunnelStore((s) => s.topic);
  const reading = useFunnelStore((s) => s.reading);
  const selectedCards = useFunnelStore((s) => s.selectedCards);
  const selectCard = useFunnelStore((s) => s.selectCard);
  const setStep = useFunnelStore((s) => s.setStep);
  const setReading = useFunnelStore((s) => s.setReading);
  const showLoading = useFunnelStore((s) => s.showLoading);
  const hideLoading = useFunnelStore((s) => s.hideLoading);

  // Shuffle order is generated client-side to avoid hydration mismatch
  // (Math.random differs between server and client). Initial render shows
  // an empty deck for one frame, then cards populate after mount.
  const [deck, setDeck] = useState<TarotCardType[]>([]);
  useEffect(() => {
    setDeck(shuffle(CARDS));
  }, []);

  const allSelected = selectedCards.length >= MAX_CARDS;
  const question = topic ? QUESTION_LABELS[topic] : 'Your reading';

  const isFlipped = (card: TarotCardType) =>
    selectedCards.some((c) => c.name === card.name);

  const handleAdvance = () => {
    if (!topic || !allSelected) return;
    showLoading('Reading your cards...');
    window.setTimeout(() => {
      if (!reading) {
        const opts = READINGS[topic];
        const pick = opts[Math.floor(Math.random() * opts.length)];
        setReading(pick);
      }
      setStep(2);
      hideLoading();
    }, READING_DELAY_MS);
  };

  return (
    <section style={{ animation: 'fadeUp 0.5s ease both' }}>
      <div className="mb-2 text-center font-serif text-[0.7rem] tracking-[0.2em] text-[rgba(201,168,76,0.7)]">
        ✦ Choose Your Cards ✦
      </div>
      <h2 className="mb-2 text-center font-serif text-[1.3rem] font-semibold leading-[1.4] tracking-[0.04em] text-paper">
        {question} — Choose 3 cards
      </h2>
      <p className="mb-6 text-center text-[0.78rem] tracking-[0.04em] text-[rgba(245,240,232,0.5)]">
        Hold your question in mind — then pick the cards you feel drawn to
      </p>

      <div className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-4">
        {deck.map((card) => {
          const flipped = isFlipped(card);
          return (
            <TarotCard
              key={card.name}
              card={card}
              flipped={flipped}
              disabled={flipped || allSelected}
              onFlip={selectCard}
            />
          );
        })}
      </div>

      <div className="mb-4 text-center text-[0.7rem] tracking-[0.1em] text-[rgba(245,240,232,0.4)]">
        {selectedCards.length} / {MAX_CARDS} chosen
      </div>

      <button
        type="button"
        disabled={!allSelected}
        onClick={handleAdvance}
        className={`w-full border bg-ink px-8 py-3 font-serif text-[0.82rem] font-semibold tracking-[0.1em] text-gold2 transition-all duration-200 ${
          allSelected
            ? 'cursor-pointer border-[rgba(201,168,76,0.4)] hover:border-gold hover:bg-[rgba(201,168,76,0.1)]'
            : 'cursor-not-allowed border-[rgba(201,168,76,0.2)] opacity-40'
        }`}
      >
        See Your Reading →
      </button>
    </section>
  );
}
