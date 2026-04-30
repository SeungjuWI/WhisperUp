'use client';

import { useTranslations } from 'next-intl';

const STEP_KEYS = ['01', '02', '03'] as const;
const SYMBOLS: Record<(typeof STEP_KEYS)[number], string> = {
  '01': '🃏',
  '02': '📊',
  '03': '🏢',
};

export default function HowItWorks() {
  const t = useTranslations('howItWorks.steps');

  return (
    <section className="relative z-[2] px-4 py-10">
      <div className="flex gap-3">
        {STEP_KEYS.map((k, i) => (
          <article
            key={k}
            className="relative flex flex-1 flex-col items-center border border-[rgba(201,168,76,0.15)] bg-[rgba(14,12,24,0.04)] px-2 py-5 text-center"
          >
            <div className="mb-2 text-[1.4rem]" aria-hidden>
              {SYMBOLS[k]}
            </div>
            <div className="mb-1 font-serif text-[0.58rem] tracking-[0.15em] text-[rgba(201,168,76,0.5)]">
              {t(`${k}.label`)}
            </div>
            <h3 className="mb-1 font-serif text-[0.78rem] font-semibold leading-[1.3] tracking-[0.02em] text-ink">
              {t(`${k}.title`)}
            </h3>
            <p className="text-[0.68rem] leading-[1.5] text-[var(--muted)]">
              {t(`${k}.desc`)}
            </p>
            {i < STEP_KEYS.length - 1 && (
              <span
                aria-hidden
                className="absolute -right-2.5 top-1/2 -translate-y-1/2 font-serif text-[0.7rem] text-[rgba(201,168,76,0.4)]"
              >
                ›
              </span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
