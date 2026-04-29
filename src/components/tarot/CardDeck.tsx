'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useFunnelStore } from '@/store/funnel-store';
import { CARDS, MAX_CARDS } from '@/lib/tarot-data';
import type { TarotCard as TarotCardType } from '@/types';
import TarotCard from './TarotCard';

const FLIP_DURATION_MS = 600; // matches .tarot-card-inner CSS transition
const FADE_DURATION_MS = 350;
const SLIDE_DURATION_MS = 600;
const SETTLE_BEAT_MS = 300; // pause after slide before loader takes over
const READING_DELAY_MS = 1800;

type Phase = 'pick' | 'fading' | 'reveal';

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
  const selectedCards = useFunnelStore((s) => s.selectedCards);
  const selectCard = useFunnelStore((s) => s.selectCard);
  const setStep = useFunnelStore((s) => s.setStep);
  const showLoading = useFunnelStore((s) => s.showLoading);
  const hideLoading = useFunnelStore((s) => s.hideLoading);

  // Client-only shuffle to avoid hydration mismatch.
  const [deck, setDeck] = useState<TarotCardType[]>([]);
  useEffect(() => {
    setDeck(shuffle(CARDS));
  }, []);

  const [phase, setPhase] = useState<Phase>('pick');
  const containerRef = useRef<HTMLDivElement>(null);
  const oldRectsRef = useRef<Map<string, DOMRect>>(new Map());

  const allSelected = selectedCards.length >= MAX_CARDS;
  const question = topic
    ? t(`tarot.deck.question.${topic}`)
    : t('tarot.deck.question.fallback');

  const isFlipped = (card: TarotCardType) =>
    selectedCards.some((c) => c.id === card.id);

  // Stage 1 — once the 3rd card is flipped, wait for the flip CSS to finish
  // then trigger the fade-out of non-selected cards.
  useEffect(() => {
    if (!topic || !allSelected || phase !== 'pick') return;
    const timer = window.setTimeout(() => setPhase('fading'), FLIP_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [topic, allSelected, phase]);

  // Stage 2 — after fade completes, capture each selected card's current
  // rect, then collapse the deck to selected-only (flexbox re-centers them).
  useEffect(() => {
    if (phase !== 'fading') return;
    const timer = window.setTimeout(() => {
      const rects = new Map<string, DOMRect>();
      containerRef.current
        ?.querySelectorAll<HTMLElement>('[data-card-id]')
        .forEach((el) => {
          const id = el.dataset.cardId;
          if (id) rects.set(id, el.getBoundingClientRect());
        });
      oldRectsRef.current = rects;
      setPhase('reveal');
    }, FADE_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  // Stage 3 — FLIP the selected cards from their old positions into their
  // newly-centered positions. Runs after DOM mutation, before paint.
  useLayoutEffect(() => {
    if (phase !== 'reveal') return;
    containerRef.current
      ?.querySelectorAll<HTMLElement>('[data-card-id]')
      .forEach((el) => {
        const id = el.dataset.cardId;
        if (!id) return;
        const oldRect = oldRectsRef.current.get(id);
        if (!oldRect) return;
        const newRect = el.getBoundingClientRect();
        const dx = oldRect.left - newRect.left;
        const dy = oldRect.top - newRect.top;
        if (dx === 0 && dy === 0) return;
        el.animate(
          [
            { transform: `translate(${dx}px, ${dy}px)` },
            { transform: 'translate(0, 0)' },
          ],
          {
            duration: SLIDE_DURATION_MS,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both',
          },
        );
      });
  }, [phase]);

  // Stage 4 — once the slide settles, trigger the reading loader and advance.
  useEffect(() => {
    if (phase !== 'reveal') return;
    const loaderTimer = window.setTimeout(() => {
      showLoading(t('loading.reading'));
    }, SLIDE_DURATION_MS + SETTLE_BEAT_MS);
    const stepTimer = window.setTimeout(() => {
      setStep(2);
      hideLoading();
    }, SLIDE_DURATION_MS + SETTLE_BEAT_MS + READING_DELAY_MS);
    return () => {
      window.clearTimeout(loaderTimer);
      window.clearTimeout(stepTimer);
    };
  }, [phase, showLoading, hideLoading, setStep, t]);

  const visibleCards = phase === 'reveal' ? selectedCards : deck;

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

      <div
        ref={containerRef}
        data-phase={phase}
        className="deck-grid mb-6 flex flex-wrap justify-center gap-2 sm:gap-4"
      >
        {visibleCards.map((card) => {
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

      <div className="text-center text-[0.7rem] tracking-[0.1em] text-[rgba(245,240,232,0.4)]">
        {t('tarot.deck.counter', { count: selectedCards.length, max: MAX_CARDS })}
      </div>
    </section>
  );
}
