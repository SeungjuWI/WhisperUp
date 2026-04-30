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
    <section className="relative z-[2] flex flex-col items-center overflow-hidden px-4 pb-16 pt-12 text-center">
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
        className="mb-5 font-serif text-[2rem] font-semibold leading-[1.15] tracking-[0.04em] text-ink"
        style={{
          animation: 'fadeUp 0.8s 0.1s ease both',
        }}
      >
        {t('h1Lead')}
        <br />
        {t('h1Trail')} <em className="not-italic text-gold">{t('h1Emphasis')}</em>
      </h1>

      <p
        className="mb-7 text-[0.92rem] font-light leading-[1.9] text-[var(--muted)]"
        style={{
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
        className="mb-8 font-serif text-[0.82rem] font-semibold tracking-[0.08em] text-gold"
        style={{ animation: 'fadeUp 0.8s 0.3s ease both' }}
      >
        {t('priceLine')}
      </div>

      <Link
        href="/reading"
        className="relative inline-block overflow-hidden border-2 border-gold bg-ink px-10 py-4 font-serif text-[0.95rem] font-semibold tracking-[0.12em] text-gold2 transition-all duration-[0.25s] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(14,12,24,0.4)]"
        style={{
          animation: 'fadeUp 0.8s 0.35s ease both, ctaPulse 2.5s 1.5s ease-in-out infinite',
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.25) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s 1.5s ease-in-out infinite',
          }}
        />
        <span className="relative">{t('cta')}</span>
      </Link>

      <div
        className="mt-3 text-[0.72rem] tracking-[0.04em] text-[var(--muted)]"
        style={{ animation: 'fadeUp 0.8s 0.4s ease both' }}
      >
        {t('ctaNote')}
      </div>

    </section>
  );
}
