'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

type Star = {
  size: number;
  left: number;
  top: number;
  opacity: number;
};

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    size: 0.5 + Math.random() * 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    opacity: 0.05 + Math.random() * 0.12,
  }));
}

export default function Hero() {
  const t = useTranslations('hero');

  // Stars are generated on the client only to avoid hydration mismatch
  // (Math.random differs between server and client renders).
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    setStars(generateStars(60));
  }, []);

  return (
    <section className="relative z-[2] flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-20 text-center sm:px-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-gold"
            style={{
              width: `${s.size}px`,
              height: `${s.size}px`,
              left: `${s.left}%`,
              top: `${s.top}%`,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      <div
        className="mb-6 font-serif text-[0.7rem] tracking-[0.3em] text-gold"
        style={{ animation: 'fadeUp 0.8s ease both' }}
      >
        ✦ {t('ornament')} ✦
      </div>

      <h1
        className="mb-5 font-serif font-semibold leading-[1.15] tracking-[0.04em] text-ink"
        style={{
          fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
          animation: 'fadeUp 0.8s 0.1s ease both',
        }}
      >
        {t('h1Lead')}
        <br />
        {t('h1Trail')} <em className="not-italic text-gold">{t('h1Emphasis')}</em>
      </h1>

      <p
        className="mb-7 max-w-[500px] font-light leading-[1.9] text-[var(--muted)]"
        style={{
          fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
          animation: 'fadeUp 0.8s 0.2s ease both',
        }}
      >
        {t('subLine1')}
        <br />
        <strong className="font-medium text-[var(--text)]">{t('subLine2')}</strong>
        <br />
        {t('subLine3')}
      </p>

      <div
        className="mx-auto mb-7 h-px w-[120px] bg-[linear-gradient(90deg,transparent,var(--gold),transparent)]"
        style={{ animation: 'fadeUp 0.8s 0.25s ease both' }}
      />

      <div
        className="mb-8 inline-block text-[0.75rem] tracking-[0.08em] text-[var(--muted)]"
        style={{ animation: 'fadeUp 0.8s 0.3s ease both' }}
      >
        {t('freeBefore')}{' '}
        <span className="border-b border-[rgba(42,157,143,0.3)] font-medium text-teal">
          {t('freeWord')}
        </span>
        {t('freeAfter')}
      </div>

      <Link
        href="/reading"
        className="inline-block border border-gold bg-ink px-12 py-[1.1rem] font-serif text-[0.95rem] font-semibold tracking-[0.12em] text-gold2 shadow-[0_4px_30px_rgba(14,12,24,0.12)] transition-all duration-[0.25s] hover:-translate-y-0.5 hover:bg-gold hover:text-ink hover:shadow-[0_8px_40px_rgba(201,168,76,0.3)]"
        style={{ animation: 'fadeUp 0.8s 0.35s ease both' }}
      >
        {t('cta')}
      </Link>

      <div
        className="mt-3 text-[0.72rem] tracking-[0.04em] text-[var(--muted)]"
        style={{ animation: 'fadeUp 0.8s 0.4s ease both' }}
      >
        {t('ctaNote')}
      </div>

      {/* fadeUp keyframe sets transform: translateY(...), which would override
          a -translate-x-1/2 on the same element and break horizontal centering.
          So horizontal centering is done by the outer absolute+flex wrapper,
          and only the inner element runs the animation. */}
      <div
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        aria-hidden
      >
        <div
          className="flex flex-col items-center gap-2"
          style={{ animation: 'fadeUp 0.8s 1.2s ease both' }}
        >
          <span className="text-[0.62rem] tracking-[0.12em] text-[var(--muted)]">
            {t('scroll')}
          </span>
          <span
            className="h-8 w-px bg-[linear-gradient(to_bottom,var(--gold),transparent)]"
            style={{ animation: 'pulse 2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
}
