'use client';

import { useTranslations } from 'next-intl';
import type { TarotCard } from '@/types';

type Props = {
  card: TarotCard;
  flipped: boolean;
  disabled: boolean;
  onFlip: (card: TarotCard) => void;
};

export default function TarotCard({ card, flipped, disabled, onFlip }: Props) {
  const t = useTranslations('tarot');
  const name = t(`cards.${card.id}.name`);
  const meaning = t(`cards.${card.id}.meaning`);

  return (
    <button
      type="button"
      data-flipped={flipped}
      data-card-id={card.id}
      disabled={disabled}
      onClick={() => onFlip(card)}
      className="tarot-card-btn"
      aria-label={flipped ? t('card.shown', { name, meaning }) : t('card.hidden')}
    >
      <div className="tarot-card-inner">
        <div className="tarot-card-back" aria-hidden />
        <div className="tarot-card-face">
          <div className="w-full truncate text-center font-serif text-[0.55rem] font-semibold tracking-[0.05em] text-gold">
            {name}
          </div>
          <div className="mt-0.5 text-[1.4rem]" aria-hidden>
            {card.symbol}
          </div>
          <div className="mt-0.5 line-clamp-3 w-full text-center text-[0.5rem] leading-[1.3] text-[rgba(245,240,232,0.5)]">
            {meaning}
          </div>
        </div>
      </div>
    </button>
  );
}
