'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { computeWeeklyCount } from '@/lib/social-counter';

const TICK_MS = 30 * 1000;

export default function SocialProofBar() {
  const t = useTranslations('social');
  const locale = useLocale();

  // Render a skeleton on the server / first client render to avoid a
  // hydration mismatch (server time ≠ client time at the bucket boundary).
  // Client picks up the real count in useEffect right after mount.
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setCount(computeWeeklyCount());
    tick();
    const id = window.setInterval(tick, TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  const formatted =
    count !== null ? new Intl.NumberFormat(locale).format(count) : '···';

  return (
    <div
      className="relative z-[2] mx-auto flex max-w-[900px] items-center justify-center gap-3 px-6 py-4"
      aria-label={t('ariaLabel')}
      aria-live="polite"
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
