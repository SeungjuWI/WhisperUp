'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useFunnelStore } from '@/store/funnel-store';
import { CARDS, MAX_CARDS } from '@/lib/tarot-data';
import type { TarotCard as TarotCardType } from '@/types';
import TarotCard from './TarotCard';

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
  const t = useTranslations();

  const topic = useFunnelStore((s) => s.topic);
  const reading = useFunnelStore((s) => s.reading);
  const selectedCards = useFunnelStore((s) => s.selectedCards);
  const selectCard = useFunnelStore((s) => s.selectCard);
  const setStep = useFunnelStore((s) => s.setStep);
  const setReading = useFunnelStore((s) => s.setReading);
  const showLoading = useFunnelStore((s) => s.showLoading);
  const hideLoading = useFunnelStore((s) => s.hideLoading);

  // Client-only shuffle to avoid hydration mismatch.
  const [deck, setDeck] = useState<TarotCardType[]>([]);
  useEffect(() => {
    setDeck(shuffle(CARDS));
  }, []);

  const allSelected = selectedCards.length >= MAX_CARDS;
  const question = topic
    ? t(`tarot.deck.question.${topic}`)
    : t('tarot.deck.question.fallback');

  const isFlipped = (card: TarotCardType) =>
    selectedCards.some((c) => c.id === card.id);

  const handleAdvance = () => {
    if (!topic || !allSelected) return;
    showLoading(t('loading.reading'));
    window.setTimeout(() => {
      if (!reading) {
        const variants = t.raw(`tarot.readings.${topic}`) as readonly string[];
        const pick = variants[Math.floor(Math.random() * variants.length)];
        setReading(pick);
      }
      setStep(2);
      hideLoading();
    }, READING_DELAY_MS);
  };

  return (
    <section style={{ animation: 'fadeUp 0.5s ease both' }}>
      <div className="mb-2 text-center font-serif text-[0.7rem] tracking-[0.2em] text-[rgba(201,168,76,0.7)]">
        {t('tarot.deck.label')}
      </div>
      <h2 className="mb-2 text-center font-serif text-[1.3rem] font-semibold leading-[1.4] tracking-[0.04em] text-paper">
        {question}
        {t('tarot.deck.questionSuffix')}
      </h2>
      <p className="mb-6 text-center text-[0.78rem] tracking-[0.04em] text-[rgba(245,240,232,0.5)]">
        {t('tarot.deck.instruction')}
      </p>

      <div className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-4">
        {deck.map((card) => {
          const flipped = isFlipped(card);
          return (
            <TarotCard
              key={card.id}
              card={card}
              flipped={flipped}
              disabled={flipped || allSelected}
              onFlip={selectCard}
            />
          );
        })}
      </div>

      <div className="mb-4 text-center text-[0.7rem] tracking-[0.1em] text-[rgba(245,240,232,0.4)]">
        {t('tarot.deck.counter', { count: selectedCards.length, max: MAX_CARDS })}
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
        {t('tarot.deck.cta')}
      </button>
    </section>
  );
}
