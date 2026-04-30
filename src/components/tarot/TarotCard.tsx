'use client';

import { useTranslations } from 'next-intl';
import type { TarotCard } from '@/types';
import TarotCardArt from './TarotCardArt';

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
          <div className="w-full text-center font-serif text-[0.45rem] tracking-[0.12em] text-[rgba(201,168,76,0.5)]">
            {card.numeral}
          </div>
          <div className="flex items-center justify-center">
            <TarotCardArt cardId={card.id} />
          </div>
          <div className="w-full truncate text-center font-serif text-[0.5rem] font-semibold tracking-[0.05em] text-gold">
            {name}
          </div>
        </div>
      </div>
    </button>
  );
}
