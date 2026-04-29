'use client';

import { useFunnelStore } from '@/store/funnel-store';
import { CARD_POSITIONS, TOPIC_LABELS } from '@/lib/tarot-data';
import Upsell from './Upsell';

export default function TarotResult() {
  const topic = useFunnelStore((s) => s.topic);
  const selectedCards = useFunnelStore((s) => s.selectedCards);
  const reading = useFunnelStore((s) => s.reading);

  const heading = topic ? TOPIC_LABELS[topic] : 'Your Reading';

  return (
    <section style={{ animation: 'fadeUp 0.5s ease both' }}>
      <div className="mb-2 text-center font-serif text-[0.7rem] tracking-[0.2em] text-[rgba(201,168,76,0.7)]">
        ✦ The Cards Speak ✦
      </div>
      <h2 className="mb-6 text-center font-serif text-[1.3rem] font-semibold leading-[1.4] tracking-[0.04em] text-paper">
        {heading}
      </h2>

      <div className="mb-6 border border-[rgba(201,168,76,0.15)] bg-[rgba(245,240,232,0.03)] p-6">
        <div className="mb-5 flex justify-center gap-2 sm:gap-3">
          {selectedCards.map((card, i) => (
            <div key={card.name} className="max-w-[100px] flex-1 text-center">
              <div className="mb-1 text-[0.63rem] tracking-[0.1em] text-[rgba(201,168,76,0.6)]">
                {CARD_POSITIONS[i] ?? ''}
              </div>
              <div className="mb-1 text-[1.4rem]" aria-hidden>
                {card.symbol}
              </div>
              <div className="mb-1 font-serif text-[0.75rem] font-semibold text-gold">
                {card.name}
              </div>
              <div className="text-[0.7rem] leading-[1.4] text-[rgba(245,240,232,0.6)]">
                {card.meaning}
              </div>
            </div>
          ))}
        </div>
        {reading && (
          // READINGS strings ship from lib/tarot-data.ts (author-controlled, not user input).
          // <em> is recolored to gold, <strong> to paper white via tailwind variants.
          <div
            className="border-t border-[rgba(201,168,76,0.12)] pt-4 text-[0.82rem] leading-[1.85] text-[rgba(245,240,232,0.7)] [&_em]:not-italic [&_em]:text-gold [&_strong]:font-medium [&_strong]:text-paper"
            dangerouslySetInnerHTML={{ __html: reading }}
          />
        )}
      </div>

      <Upsell />
    </section>
  );
}
