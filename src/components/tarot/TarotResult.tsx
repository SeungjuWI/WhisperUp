'use client';

import { useTranslations } from 'next-intl';
import { useFunnelStore } from '@/store/funnel-store';

const SLOT_KEYS = ['situation', 'energy', 'outcome'] as const;

export default function TarotResult() {
  const t = useTranslations('tarot');
  const topic = useFunnelStore((s) => s.topic);
  const selectedCards = useFunnelStore((s) => s.selectedCards);
  const setStep = useFunnelStore((s) => s.setStep);

  const heading = topic
    ? t(`result.heading.${topic}`)
    : t('result.heading.fallback');

  return (
    <section style={{ animation: 'fadeUp 0.5s ease both' }}>
      <div className="mb-2 text-center font-serif text-[0.7rem] tracking-[0.2em] text-[rgba(201,168,76,0.7)]">
        {t('result.label')}
      </div>
      <h2 className="mb-5 text-center font-serif text-[1.15rem] font-semibold leading-[1.4] tracking-[0.04em] text-paper">
        {heading}
      </h2>

      <div className="mb-5 border border-[rgba(201,168,76,0.15)] bg-[rgba(245,240,232,0.03)] p-4">
        <div className="mb-5 flex justify-center gap-2">
          {selectedCards.map((card, i) => (
            <div key={card.id} className="max-w-[100px] flex-1 text-center">
              <div className="mb-1 text-[0.63rem] tracking-[0.1em] text-[rgba(201,168,76,0.6)]">
                {t(`result.positions.${i}`)}
              </div>
              <div className="mb-1 text-[1.4rem]" aria-hidden>
                {card.symbol}
              </div>
              <div className="mb-1 font-serif text-[0.75rem] font-semibold text-gold">
                {t(`cards.${card.id}.name`)}
              </div>
              <div className="text-[0.7rem] leading-[1.4] text-[rgba(245,240,232,0.6)]">
                {t(`cards.${card.id}.meaning`)}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 border-t border-[rgba(201,168,76,0.12)] pt-4">
          {selectedCards.map((card, i) => {
            const slot = SLOT_KEYS[i];
            if (!slot) return null;
            return (
              <div key={card.id}>
                <div className="mb-1 font-serif text-[0.65rem] tracking-[0.18em] text-[rgba(201,168,76,0.7)]">
                  {t(`result.positions.${i}`)} · {t(`cards.${card.id}.name`)}
                </div>
                {/* Interpretation copy comes from messages/*.json (author-controlled),
                    so dangerouslySetInnerHTML is safe. t.raw() bypasses next-intl's
                    rich-text parsing of <em>/<strong>. <em> recolored gold, <strong> paper. */}
                <p
                  className="text-[0.82rem] leading-[1.8] text-[rgba(245,240,232,0.7)] [&_em]:not-italic [&_em]:text-gold [&_strong]:font-medium [&_strong]:text-paper"
                  dangerouslySetInnerHTML={{
                    __html: t.raw(`cards.${card.id}.interpretations.${slot}`) as string,
                  }}
                />
              </div>
            );
          })}
          {topic && (
            <p
              className="border-t border-[rgba(201,168,76,0.12)] pt-4 text-[0.82rem] leading-[1.85] text-[rgba(245,240,232,0.75)] [&_em]:not-italic [&_em]:text-gold [&_strong]:font-medium [&_strong]:text-paper"
              dangerouslySetInnerHTML={{
                __html: t.raw(`result.synthesis.${topic}`) as string,
              }}
            />
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setStep(4)}
        className="block w-full cursor-pointer border border-[rgba(201,168,76,0.4)] bg-[rgba(201,168,76,0.05)] px-8 py-4 font-serif text-[0.85rem] font-semibold tracking-[0.08em] text-gold transition-all duration-200 hover:-translate-y-px hover:border-gold hover:bg-[rgba(201,168,76,0.12)]"
      >
        {t('result.softCta')}
      </button>
      <div className="mt-2 text-center text-[0.68rem] text-[rgba(245,240,232,0.35)]">
        {t('result.softCtaNote')}
      </div>
    </section>
  );
}
