'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const switchTo = (next: Locale) => {
    if (next === active) return;
    setOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const btnCls =
    variant === 'dark'
      ? 'text-[rgba(245,240,232,0.5)] hover:text-gold'
      : 'text-[var(--muted)] hover:text-[var(--text)]';

  const dropBg =
    variant === 'dark'
      ? 'bg-[#1a1630] border-[rgba(201,168,76,0.25)]'
      : 'bg-[rgba(245,240,232,0.98)] border-[rgba(201,168,76,0.25)]';

  const itemActiveCls = variant === 'dark' ? 'text-gold' : 'text-[var(--text)] font-semibold';
  const itemCls =
    variant === 'dark'
      ? 'text-[rgba(245,240,232,0.5)] hover:text-paper'
      : 'text-[var(--muted)] hover:text-[var(--text)]';

  return (
    <div ref={ref} className="relative" aria-label="Language">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 transition-colors duration-150 ${btnCls}`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="text-[0.65rem] font-semibold tracking-[0.1em]">
          {t(active)}
        </span>
      </button>

      {open && (
        <div
          className={`absolute right-0 top-full mt-2 min-w-[80px] border p-1 shadow-lg ${dropBg}`}
          role="listbox"
          aria-activedescendant={active}
        >
          {routing.locales.map((l) => (
            <button
              key={l}
              type="button"
              role="option"
              aria-selected={l === active}
              onClick={() => switchTo(l)}
              className={`block w-full px-3 py-2 text-left font-serif text-[0.72rem] tracking-[0.1em] transition-colors ${
                l === active ? itemActiveCls : itemCls
              }`}
            >
              {t(l)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
