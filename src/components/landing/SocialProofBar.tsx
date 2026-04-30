'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { computeWeeklyCount } from '@/lib/social-counter';

const TICK_MS = 30 * 1000;

export default function SocialProofBar() {
  const t = useTranslations('social');
  const locale = useLocale();

  // Skeleton on the server / first client render avoids a hydration
  // mismatch — server time and client time may straddle a 5-minute bucket.
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
      className="relative z-[3] border-b border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.10)]"
      aria-label={t('ariaLabel')}
      aria-live="polite"
    >
      <div className="flex flex-wrap items-center justify-center gap-3 px-4 py-4">
        <span
          aria-hidden
          className="h-2 w-2 rounded-full bg-[#4ade80] shadow-[0_0_6px_rgba(74,222,128,0.6)]"
          style={{ animation: 'glow 2s ease-in-out infinite' }}
        />
        <span className="text-[0.88rem] font-medium tracking-[0.04em] text-[var(--text)]">
          {t.rich('weeklyCount', {
            count: formatted,
            n: (chunks) => (
              <span className="mx-1 font-serif text-[1.4rem] font-semibold text-gold">
                {chunks}
              </span>
            ),
          })}
        </span>
      </div>
    </div>
  );
}
