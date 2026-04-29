import { getLocale, getTranslations } from 'next-intl/server';

// Placeholder count for MVP — replace with a real analytics-derived value
// (Supabase query or PostHog cohort) once Task 10 lands.
const WEEKLY_COUNT = 1247;

export default async function SocialProofBar() {
  const t = await getTranslations('social');
  const locale = await getLocale();
  const formatted = new Intl.NumberFormat(locale).format(WEEKLY_COUNT);

  return (
    <div
      className="relative z-[2] mx-auto flex max-w-[900px] items-center justify-center gap-3 px-6 py-4"
      aria-label={t('ariaLabel')}
    >
      <span aria-hidden className="font-serif text-[0.7rem] text-gold">
        ✦
      </span>
      <span className="text-[0.78rem] tracking-[0.05em] text-[var(--muted)]">
        {t.rich('weeklyCount', {
          count: formatted,
          n: (chunks) => (
            <span className="font-serif font-semibold text-gold">{chunks}</span>
          ),
        })}
      </span>
      <span aria-hidden className="font-serif text-[0.7rem] text-gold">
        ✦
      </span>
    </div>
  );
}
