'use client';

import type { TarotCard } from '@/types';

type Props = {
  card: TarotCard;
  flipped: boolean;
  disabled: boolean;
  onFlip: (card: TarotCard) => void;
};

export default function TarotCard({ card, flipped, disabled, onFlip }: Props) {
  return (
    <button
      type="button"
      data-flipped={flipped}
      disabled={disabled}
      onClick={() => onFlip(card)}
      className="tarot-card-btn"
      aria-label={flipped ? `${card.name}: ${card.meaning}` : 'Hidden tarot card'}
    >
      <div className="tarot-card-inner">
        <div className="tarot-card-back" aria-hidden />
        <div className="tarot-card-face">
          <div className="font-serif text-[0.6rem] font-semibold tracking-[0.1em] text-gold">
            {card.name}
          </div>
          <div className="mt-1 text-[1.5rem]" aria-hidden>
            {card.symbol}
          </div>
          <div className="mt-1 text-[0.58rem] leading-[1.3] text-[rgba(245,240,232,0.5)]">
            {card.meaning}
          </div>
        </div>
      </div>
    </button>
  );
}
