'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Item = { q: string; a: string };

export default function FAQ() {
  const t = useTranslations('faq');
  const items = t.raw('items') as readonly Item[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative z-[2] mx-auto max-w-[720px] px-6 py-16">
      <div className="mb-8 text-center font-serif text-[0.68rem] tracking-[0.2em] text-gold">
        {t('label')}
      </div>
      <ul className="divide-y divide-[rgba(201,168,76,0.15)] border-y border-[rgba(201,168,76,0.15)]">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <li key={item.q}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-4 px-1 py-4 text-left transition-colors hover:text-gold"
              >
                <span className="font-serif text-[0.92rem] font-semibold text-[var(--text)]">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={`mt-1 text-[0.7rem] text-gold transition-transform duration-200 ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                >
                  ✦
                </span>
              </button>
              {isOpen && (
                <p className="px-1 pb-5 text-[0.85rem] leading-[1.8] text-[var(--muted)]">
                  {item.a}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
