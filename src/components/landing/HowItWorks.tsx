import { getTranslations } from 'next-intl/server';

const STEP_KEYS = ['01', '02', '03'] as const;
const SYMBOLS: Record<(typeof STEP_KEYS)[number], string> = {
  '01': '🃏',
  '02': '📊',
  '03': '🏢',
};

export default async function HowItWorks() {
  const t = await getTranslations('howItWorks.steps');

  return (
    <section className="relative z-[2] mx-auto max-w-[960px] px-6 py-20 sm:px-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {STEP_KEYS.map((k) => (
          <article
            key={k}
            className="border border-[rgba(201,168,76,0.15)] bg-[rgba(14,12,24,0.04)] p-6 text-center transition-colors duration-200 hover:border-[rgba(201,168,76,0.35)]"
          >
            <div className="mb-3 font-serif text-[0.65rem] tracking-[0.2em] text-[rgba(201,168,76,0.5)]">
              {t(`${k}.label`)}
            </div>
            <div className="mb-2 text-[1.6rem]" aria-hidden>
              {SYMBOLS[k]}
            </div>
            <h3 className="mb-1 font-serif text-[0.88rem] font-semibold tracking-[0.04em] text-ink">
              {t(`${k}.title`)}
            </h3>
            <p className="text-[0.78rem] leading-[1.7] text-[var(--muted)]">{t(`${k}.desc`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
