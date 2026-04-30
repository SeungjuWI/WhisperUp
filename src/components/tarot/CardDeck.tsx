'use client';

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useFunnelStore } from '@/store/funnel-store';
import { CARDS, MAX_CARDS } from '@/lib/tarot-data';
import type { TarotCard as TarotCardType } from '@/types';
import TarotCard from './TarotCard';

const FLIP_DURATION_MS = 600;
const FADE_DURATION_MS = 350;
const SLIDE_DURATION_MS = 600;
const SETTLE_BEAT_MS = 300;
const READING_DELAY_MS = 1800;

type Phase = 'stacked' | 'shuffling' | 'spreading' | 'pick' | 'fading' | 'reveal';

// Shuffle stages within 'shuffling' phase
type ShuffleStage = 'split' | 'riffle' | 'stack' | 'done';

function shuffle<T>(arr: readonly T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const PILE_COUNT = 10;

export default function CardDeck() {
  const t = useTranslations();

  const topic = useFunnelStore((s) => s.topic);
  const selectedCards = useFunnelStore((s) => s.selectedCards);
  const selectCard = useFunnelStore((s) => s.selectCard);
  const setStep = useFunnelStore((s) => s.setStep);
  const showLoading = useFunnelStore((s) => s.showLoading);
  const hideLoading = useFunnelStore((s) => s.hideLoading);

  const [deck, setDeck] = useState<TarotCardType[]>([]);
  const [phase, setPhase] = useState<Phase>('stacked');
  const [shuffleStage, setShuffleStage] = useState<ShuffleStage>('split');
  const [shuffleRound, setShuffleRound] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const oldRectsRef = useRef<Map<string, DOMRect>>(new Map());

  useEffect(() => {
    setDeck(shuffle(CARDS));
  }, []);

  const allSelected = selectedCards.length >= MAX_CARDS;
  const question = topic
    ? t(`tarot.deck.question.${topic}`)
    : t('tarot.deck.question.fallback');

  const isFlipped = (card: TarotCardType) =>
    selectedCards.some((c) => c.id === card.id);

  const TOTAL_ROUNDS = 3;

  const handleShuffle = useCallback(() => {
    setPhase('shuffling');
    setShuffleRound(0);
    setShuffleStage('split');
  }, []);

  // Drive the shuffle cycle: split → riffle → stack → (repeat or done)
  useEffect(() => {
    if (phase !== 'shuffling') return;

    let timer: number;
    switch (shuffleStage) {
      case 'split':
        // Hold the split pose
        timer = window.setTimeout(() => setShuffleStage('riffle'), 500);
        break;
      case 'riffle':
        // Hold the riffle (interleave) pose
        timer = window.setTimeout(() => setShuffleStage('stack'), 600);
        break;
      case 'stack':
        // Cards merge back into one pile
        timer = window.setTimeout(() => {
          if (shuffleRound + 1 < TOTAL_ROUNDS) {
            setShuffleRound((r) => r + 1);
            setShuffleStage('split');
          } else {
            setShuffleStage('done');
          }
        }, 400);
        break;
      case 'done':
        timer = window.setTimeout(() => {
          setDeck(shuffle(CARDS));
          setPhase('spreading');
        }, 300);
        break;
    }
    return () => window.clearTimeout(timer);
  }, [phase, shuffleStage, shuffleRound]);

  // spreading → pick
  useEffect(() => {
    if (phase !== 'spreading') return;
    const timer = window.setTimeout(() => setPhase('pick'), 800);
    return () => window.clearTimeout(timer);
  }, [phase]);

  // Stage 1 — 3rd card flipped → fading
  useEffect(() => {
    if (!topic || !allSelected || phase !== 'pick') return;
    const timer = window.setTimeout(() => setPhase('fading'), FLIP_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [topic, allSelected, phase]);

  // Stage 2 — fade out non-selected, capture rects
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

  // Stage 3 — FLIP selected cards into centered row
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

  // Stage 4 — trigger reading loader
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
  const isStacked = phase === 'stacked';
  const isShuffling = phase === 'shuffling';
  const isSpreading = phase === 'spreading';
  const isInteractive = phase === 'pick';

  // Build pile card styles based on shuffle stage
  const getPileCardStyle = (i: number): React.CSSProperties => {
    const half = Math.floor(PILE_COUNT / 2);
    const isLeftHalf = i < half;
    const stackOffset = i * -2;

    switch (shuffleStage) {
      case 'split': {
        // Split into two halves — left and right
        const xOffset = isLeftHalf ? -40 : 40;
        const yOffset = isLeftHalf ? (i * -2) : ((i - half) * -2);
        return {
          transform: `translateX(${xOffset}px) translateY(${yOffset}px)`,
          transition: 'transform 0.45s cubic-bezier(0.33, 1, 0.68, 1)',
          zIndex: PILE_COUNT - i,
        };
      }
      case 'riffle': {
        // Interleave: cards cascade down into center from alternating sides
        // Reorder visually — even indices from left, odd from right
        const riffleIndex = isLeftHalf
          ? i * 2           // left cards get even slots
          : (i - half) * 2 + 1;  // right cards get odd slots
        const yPos = riffleIndex * -2;
        // Slight stagger from the sides
        const xFrom = isLeftHalf ? -20 : 20;
        return {
          transform: `translateX(${xFrom}px) translateY(${yPos}px)`,
          transition: `transform 0.5s cubic-bezier(0.33, 1, 0.68, 1) ${riffleIndex * 30}ms`,
          zIndex: PILE_COUNT - riffleIndex,
        };
      }
      case 'stack':
      case 'done': {
        // Merge back into single pile
        return {
          transform: `translateY(${stackOffset}px)`,
          transition: 'transform 0.35s cubic-bezier(0.33, 1, 0.68, 1)',
          zIndex: PILE_COUNT - i,
        };
      }
      default: {
        return {
          transform: `translateY(${stackOffset}px) rotate(${i * 0.3}deg)`,
          zIndex: PILE_COUNT - i,
        };
      }
    }
  };

  return (
    <section style={{ animation: 'fadeUp 0.5s ease both' }}>
      <div className="mb-2 text-center font-serif text-[0.7rem] tracking-[0.2em] text-[rgba(201,168,76,0.7)]">
        {t('tarot.deck.label')}
      </div>
      <h2 className="mb-2 text-center font-serif text-[1.15rem] font-semibold leading-[1.4] tracking-[0.04em] text-paper">
        {question}
        {t('tarot.deck.questionSuffix')}
      </h2>

      {/* Stacked / Shuffling */}
      {(isStacked || isShuffling) && (
        <div className="flex flex-col items-center gap-6 py-8" style={{ animation: 'fadeUp 0.4s ease both' }}>
          <div className="deck-pile">
            {Array.from({ length: PILE_COUNT }).map((_, i) => (
              <div
                key={i}
                className="deck-pile-card"
                style={
                  isShuffling
                    ? getPileCardStyle(i)
                    : {
                        transform: `translateY(${i * -2}px) rotate(${i * 0.3}deg)`,
                        zIndex: PILE_COUNT - i,
                      }
                }
              />
            ))}
          </div>

          {isShuffling ? (
            <p className="text-center text-[0.78rem] tracking-[0.04em] text-[rgba(245,240,232,0.5)] animate-pulse">
              {t('tarot.deck.shuffling')}
            </p>
          ) : (
            <button
              type="button"
              onClick={handleShuffle}
              className="shuffle-btn"
            >
              <span className="font-serif text-[0.8rem] tracking-[0.15em]">
                {t('tarot.deck.shuffleBtn')}
              </span>
            </button>
          )}
        </div>
      )}

      {/* Spreading */}
      {isSpreading && (
        <div className="mb-6">
          <p className="mb-4 text-center text-[0.78rem] tracking-[0.04em] text-[rgba(245,240,232,0.5)]">
            {t('tarot.deck.instruction')}
          </p>
          <div
            ref={containerRef}
            className="deck-grid flex flex-wrap justify-center gap-2"
          >
            {visibleCards.map((card, i) => (
              <div
                key={card.id}
                className="deck-spread-card"
                style={{ '--spread-index': i, '--spread-total': visibleCards.length } as React.CSSProperties}
              >
                <TarotCard
                  card={card}
                  flipped={false}
                  disabled={true}
                  onFlip={selectCard}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pick / Fading / Reveal */}
      {(isInteractive || phase === 'fading' || phase === 'reveal') && (
        <>
          <p className="mb-6 text-center text-[0.78rem] tracking-[0.04em] text-[rgba(245,240,232,0.5)]">
            {t('tarot.deck.instruction')}
          </p>

          <div
            ref={containerRef}
            data-phase={phase}
            className="deck-grid mb-6 flex flex-wrap justify-center gap-2"
            style={isInteractive && !allSelected ? { animation: 'fadeUp 0.3s ease both' } : undefined}
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
        </>
      )}
    </section>
  );
}
