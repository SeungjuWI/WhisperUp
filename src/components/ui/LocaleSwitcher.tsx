'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname, routing, type Locale } from '@/i18n/routing';
import { useTransition } from 'react';

type Variant = 'light' | 'dark';

type Props = {
  /** Adjusts color tokens for landing (paper) vs tarot (ink) backgrounds. */
  variant?: Variant;
};

export default function LocaleSwitcher({ variant = 'light' }: Props) {
  const active = useLocale() as Locale;
  const t = useTranslations('locale');
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === active) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  const activeCls = variant === 'dark' ? 'text-gold' : 'text-[var(--text)]';
  const inactiveCls =
    variant === 'dark'
      ? 'text-[rgba(245,240,232,0.4)] hover:text-paper'
      : 'text-[var(--muted)] hover:text-[var(--text)]';
  const sepCls =
    variant === 'dark' ? 'text-[rgba(245,240,232,0.2)]' : 'text-[rgba(122,112,144,0.5)]';

  return (
    <div
      className="flex items-center gap-2 text-[0.65rem] tracking-[0.15em]"
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden className={sepCls}>
              ·
            </span>
          )}
          <button
            type="button"
            onClick={() => switchTo(l)}
            aria-pressed={l === active}
            className={`font-serif font-semibold transition-colors duration-150 ${
              l === active ? activeCls : inactiveCls
            } ${l === active ? 'cursor-default' : 'cursor-pointer'}`}
          >
            {t(l)}
          </button>
        </span>
      ))}
    </div>
  );
}
