'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';

type Testimonial = {
  quote: string;
  name: string;
  meta: string;
};

const AUTO_INTERVAL = 4000;

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as readonly Testimonial[];

  const [current, setCurrent] = useState(0);
  const [maxH, setMaxH] = useState<number | undefined>(undefined);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  // measure tallest card
  useEffect(() => {
    const heights = cardsRef.current.map((el) => el?.offsetHeight ?? 0);
    const tallest = Math.max(...heights);
    if (tallest > 0) setMaxH(tallest);
  }, [items]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, AUTO_INTERVAL);
  }, [items.length]);

  // auto-play
  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  // swipe
  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    clearInterval(timerRef.current);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCurrent((prev) => (prev + 1) % items.length);
      } else {
        setCurrent((prev) => (prev - 1 + items.length) % items.length);
      }
    }
    resetTimer();
  };

  return (
    <section className="relative z-[2] overflow-hidden py-10">
      <div className="mb-6 text-center font-serif text-[0.68rem] tracking-[0.2em] text-gold">
        {t('label')}
      </div>

      <div
        className="px-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((item, i) => (
            <article
              key={item.name + item.meta}
              className="w-full flex-shrink-0 px-1"
            >
              <div
                ref={(el) => { cardsRef.current[i] = el; }}
                className={`border p-5 transition-colors duration-300 ${
                  i === current
                    ? 'border-[rgba(201,168,76,0.35)] bg-[rgba(14,12,24,0.06)]'
                    : 'border-[rgba(201,168,76,0.15)] bg-[rgba(14,12,24,0.02)]'
                }`}
                style={maxH ? { minHeight: maxH } : undefined}
              >
                <p className="mb-3 text-[0.85rem] leading-[1.7] text-[var(--text)]">
                  <span aria-hidden className="font-serif text-gold">
                    &ldquo;
                  </span>
                  {item.quote}
                  <span aria-hidden className="font-serif text-gold">
                    &rdquo;
                  </span>
                </p>
                <div className="text-[0.72rem] tracking-[0.04em] text-[var(--muted)]">
                  <span className="font-serif font-semibold text-[var(--text)]">
                    {item.name}
                  </span>{' '}
                  · {item.meta}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* dots */}
      <div className="mt-4 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Testimonial ${i + 1}`}
            onClick={() => {
              setCurrent(i);
              resetTimer();
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-4 bg-gold' : 'w-1.5 bg-[rgba(201,168,76,0.3)]'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
