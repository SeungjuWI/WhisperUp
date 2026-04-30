'use client';

import { useTranslations } from 'next-intl';

const STEP_KEYS = ['01', '02', '03'] as const;

function TarotCardIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="2" width="18" height="24" rx="2" stroke="var(--gold)" strokeWidth="1.5" />
      <rect x="8" y="5" width="12" height="18" rx="1" stroke="var(--gold)" strokeWidth="0.75" opacity="0.4" />
      <path d="M14 10l1.5 3 3.5.5-2.5 2.5.5 3.5L14 18l-3 1.5.5-3.5L9 13.5l3.5-.5L14 10z" fill="var(--gold)" opacity="0.7" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="18" width="4" height="6" rx="0.5" fill="var(--gold)" opacity="0.4" />
      <rect x="12" y="12" width="4" height="12" rx="0.5" fill="var(--gold)" opacity="0.6" />
      <rect x="20" y="6" width="4" height="18" rx="0.5" fill="var(--gold)" opacity="0.8" />
      <path d="M4 17L12 11L16 13L24 5" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 5h4v4" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="12" height="18" rx="1" stroke="var(--gold)" strokeWidth="1.5" />
      <rect x="16" y="14" width="8" height="12" rx="1" stroke="var(--gold)" strokeWidth="1.5" />
      <rect x="7" y="11" width="2.5" height="2.5" rx="0.5" fill="var(--gold)" opacity="0.5" />
      <rect x="10.5" y="11" width="2.5" height="2.5" rx="0.5" fill="var(--gold)" opacity="0.5" />
      <rect x="7" y="15" width="2.5" height="2.5" rx="0.5" fill="var(--gold)" opacity="0.5" />
      <rect x="10.5" y="15" width="2.5" height="2.5" rx="0.5" fill="var(--gold)" opacity="0.5" />
      <rect x="7" y="19" width="2.5" height="2.5" rx="0.5" fill="var(--gold)" opacity="0.5" />
      <rect x="10.5" y="19" width="2.5" height="2.5" rx="0.5" fill="var(--gold)" opacity="0.5" />
      <rect x="19" y="17" width="2.5" height="2.5" rx="0.5" fill="var(--gold)" opacity="0.5" />
      <rect x="19" y="21" width="2.5" height="2.5" rx="0.5" fill="var(--gold)" opacity="0.5" />
    </svg>
  );
}

const ICONS: Record<(typeof STEP_KEYS)[number], () => React.JSX.Element> = {
  '01': TarotCardIcon,
  '02': ChartIcon,
  '03': BuildingIcon,
};

export default function HowItWorks() {
  const t = useTranslations('howItWorks.steps');

  return (
    <section className="relative z-[2] px-4 py-10">
      <div className="flex gap-3">
        {STEP_KEYS.map((k, i) => (
          <article
            key={k}
            className="corner-ornament relative flex flex-1 flex-col items-center border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.04)] px-2 py-5 text-center"
          >
            <div className="mb-2" aria-hidden>
              {ICONS[k]()}
            </div>
            <div className="mb-1 font-serif text-[0.58rem] tracking-[0.15em] text-[rgba(201,168,76,0.5)]">
              {t(`${k}.label`)}
            </div>
            <h3 className="mb-1 font-serif text-[0.78rem] font-semibold leading-[1.3] tracking-[0.02em] text-paper">
              {t(`${k}.title`)}
            </h3>
            <p className="text-[0.68rem] leading-[1.5] text-[rgba(245,240,232,0.5)]">
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
