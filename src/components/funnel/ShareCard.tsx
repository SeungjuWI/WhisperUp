'use client';

import { forwardRef } from 'react';
import { useTranslations } from 'next-intl';
import { useFunnelStore } from '@/store/funnel-store';

/**
 * Share card used as both inline preview and html2canvas capture target.
 */
const ShareCard = forwardRef<HTMLDivElement>(function ShareCard(_props, ref) {
  const t = useTranslations('tarot');
  const tComplete = useTranslations('complete');
  const topic = useFunnelStore((s) => s.topic);
  const selectedCards = useFunnelStore((s) => s.selectedCards);

  const heading = topic
    ? t(`result.heading.${topic}`)
    : t('result.heading.fallback');

  return (
    <div
      ref={ref}
      className="bg-ink px-6 py-8"
    >
      {/* Brand */}
      <div className="mb-2 text-center font-serif text-[0.68rem] tracking-[0.2em] text-[rgba(201,168,76,0.7)]">
        WHISPER-UP
      </div>
      <div className="mb-6 text-center font-serif text-[1rem] font-semibold leading-[1.4] tracking-[0.04em] text-paper">
        {heading}
      </div>

      {/* Cards row */}
      <div className="mb-6 flex justify-center gap-4">
        {selectedCards.map((card, i) => (
          <div key={card.id} className="w-[100px] text-center">
            <div className="mb-1 text-[0.6rem] tracking-[0.1em] text-[rgba(201,168,76,0.6)]">
              {t(`result.positions.${i}`)}
            </div>
            <div className="mb-1 text-[2rem]">{card.symbol}</div>
            <div className="mb-1 font-serif text-[0.75rem] font-semibold text-gold">
              {t(`cards.${card.id}.name`)}
            </div>
            <div className="text-[0.68rem] leading-[1.4] text-[rgba(245,240,232,0.6)]">
              {t(`cards.${card.id}.meaning`)}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div
        className="mb-5 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
        }}
      />

      {/* CTA text */}
      <div className="text-center font-serif text-[0.75rem] tracking-[0.08em] text-gold">
        {tComplete('shareText')}
      </div>
    </div>
  );
});

export default ShareCard;
