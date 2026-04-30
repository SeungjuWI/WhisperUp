'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { computeWeeklyCount } from '@/lib/social-counter';

const TICK_MS = 30 * 1000;

export default function SocialProofBadge() {
  const t = useTranslations('social');
  const locale = useLocale();

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
      className="relative z-[3] flex justify-center py-3"
      aria-label={t('ariaLabel')}
      aria-live="polite"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(14,12,24,0.08)] bg-[rgba(14,12,24,0.04)] px-4 py-1.5">
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_4px_rgba(74,222,128,0.5)]"
          style={{ animation: 'pulse 2s ease-in-out infinite' }}
        />
        <span className="text-[0.75rem] tracking-[0.02em] text-[var(--muted)]">
          {t.rich('weeklyCount', {
            count: formatted,
            n: (chunks) => (
              <span className="font-semibold text-ink">{chunks}</span>
            ),
          })}
        </span>
      </div>
    </div>
  );
}
