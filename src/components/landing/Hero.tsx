'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

type Star = {
  size: number;
  left: number;
  top: number;
  opacity: number;
  twinkleDelay: number;
  twinkleDuration: number;
};

type FloatingSymbol = {
  symbol: string;
  left: number;
  top: number;
  opacity: number;
  delay: number;
  duration: number;
  size: number;
};

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    size: 0.8 + Math.random() * 2.5,
    left: Math.random() * 100,
    top: Math.random() * 85,
    opacity: 0.3 + Math.random() * 0.7,
    twinkleDelay: Math.random() * 5,
    twinkleDuration: 2 + Math.random() * 3,
  }));
}

function generateFloatingSymbols(count: number): FloatingSymbol[] {
  const symbols = ['\u2726', '\u2605', '\u263D', '\u2727', '\u2736'];
  return Array.from({ length: count }, () => ({
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    left: Math.random() * 100,
    top: 10 + Math.random() * 70,
    opacity: 0.06 + Math.random() * 0.1,
    delay: Math.random() * 8,
    duration: 4 + Math.random() * 4,
    size: 0.5 + Math.random() * 0.8,
  }));
}

function MysticEyeSvg() {
  return (
    <svg
      width="140"
      height="84"
      viewBox="0 0 120 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
      style={{ animation: 'mysticGlow 3s ease-in-out infinite' }}
    >
      <path
        d="M10 36C10 36 30 8 60 8C90 8 110 36 110 36C110 36 90 64 60 64C30 64 10 36 10 36Z"
        stroke="var(--gold)"
        strokeWidth="1"
        opacity="0.5"
        fill="none"
      />
      <path
        d="M20 36C20 36 35 16 60 16C85 16 100 36 100 36C100 36 85 56 60 56C35 56 20 36 20 36Z"
        stroke="var(--gold)"
        strokeWidth="0.5"
        opacity="0.3"
        fill="none"
      />
      <circle cx="60" cy="36" r="14" stroke="var(--gold)" strokeWidth="1" opacity="0.5" fill="none" />
      <circle cx="60" cy="36" r="8" stroke="var(--gold)" strokeWidth="0.75" opacity="0.35" fill="none" />
      <circle cx="60" cy="36" r="3" fill="var(--gold)" opacity="0.5" />
      {/* Rays */}
      <line x1="60" y1="0" x2="60" y2="9" stroke="var(--gold)" strokeWidth="0.5" opacity="0.3" />
      <line x1="60" y1="63" x2="60" y2="72" stroke="var(--gold)" strokeWidth="0.5" opacity="0.3" />
      <line x1="36" y1="8" x2="40" y2="16" stroke="var(--gold)" strokeWidth="0.5" opacity="0.2" />
      <line x1="84" y1="8" x2="80" y2="16" stroke="var(--gold)" strokeWidth="0.5" opacity="0.2" />
      <line x1="36" y1="64" x2="40" y2="56" stroke="var(--gold)" strokeWidth="0.5" opacity="0.2" />
      <line x1="84" y1="64" x2="80" y2="56" stroke="var(--gold)" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

function MoonPhases() {
  return (
    <div className="flex items-center justify-center gap-3" style={{ animation: 'fadeUp 0.8s 0.15s ease both' }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="var(--gold)" strokeWidth="0.5" opacity="0.35" />
        <path d="M7 1.5A5.5 5.5 0 0 1 7 12.5A3 3 0 0 0 7 1.5Z" fill="var(--gold)" opacity="0.25" />
      </svg>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="var(--gold)" strokeWidth="0.5" opacity="0.35" />
        <path d="M7 1.5A5.5 5.5 0 0 1 7 12.5L7 1.5Z" fill="var(--gold)" opacity="0.3" />
      </svg>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="var(--gold)" strokeWidth="0.75" opacity="0.5" />
        <circle cx="10" cy="10" r="8" fill="var(--gold)" opacity="0.15" />
      </svg>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="var(--gold)" strokeWidth="0.5" opacity="0.35" />
        <path d="M7 1.5A5.5 5.5 0 0 0 7 12.5L7 1.5Z" fill="var(--gold)" opacity="0.3" />
      </svg>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="var(--gold)" strokeWidth="0.5" opacity="0.35" />
        <path d="M7 1.5A5.5 5.5 0 0 0 7 12.5A3 3 0 0 1 7 1.5Z" fill="var(--gold)" opacity="0.25" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const t = useTranslations('hero');

  const [stars, setStars] = useState<Star[]>([]);
  const [floatingSymbols, setFloatingSymbols] = useState<FloatingSymbol[]>([]);
  useEffect(() => {
    setStars(generateStars(100));
    setFloatingSymbols(generateFloatingSymbols(15));
  }, []);

  return (
    <section className="relative z-[2] overflow-hidden bg-ink pb-0 pt-12 text-center">
      {/* Ambient candlelight glow — warm radial pulses */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute left-1/2 top-[30%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 40%, transparent 70%)',
            animation: 'candleFlicker 4s ease-in-out infinite',
          }}
        />
        <div
          className="absolute left-[20%] top-[60%] h-[200px] w-[200px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(124,92,191,0.08) 0%, transparent 60%)',
            animation: 'candleFlicker 5s 1s ease-in-out infinite',
          }}
        />
        <div
          className="absolute right-[15%] top-[20%] h-[180px] w-[180px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(124,92,191,0.06) 0%, transparent 60%)',
            animation: 'candleFlicker 6s 2s ease-in-out infinite',
          }}
        />
      </div>

      {/* Fog / mist layers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute bottom-[10%] left-0 h-[120px] w-[200%]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(124,92,191,0.04), rgba(201,168,76,0.03), transparent)',
            animation: 'fogDrift 12s linear infinite',
          }}
        />
        <div
          className="absolute bottom-[25%] left-0 h-[80px] w-[200%]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.03), rgba(124,92,191,0.02), transparent)',
            animation: 'fogDrift 18s 3s linear infinite reverse',
          }}
        />
      </div>

      {/* Twinkling stars */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-gold2"
            style={{
              width: `${s.size}px`,
              height: `${s.size}px`,
              left: `${s.left}%`,
              top: `${s.top}%`,
              '--twinkle-base': s.opacity * 0.3,
              '--twinkle-peak': s.opacity,
              animation: `twinkle ${s.twinkleDuration}s ${s.twinkleDelay}s ease-in-out infinite`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Floating mystic symbols */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {floatingSymbols.map((f, i) => (
          <span
            key={i}
            className="absolute font-serif text-gold"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              fontSize: `${f.size}rem`,
              '--float-opacity': f.opacity,
              animation: `floatSymbol ${f.duration}s ${f.delay}s ease-in-out infinite`,
            } as React.CSSProperties}
          >
            {f.symbol}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-[1] flex flex-col items-center px-4 pb-20">
        <div
          className="mb-5"
          style={{ animation: 'fadeUp 0.8s ease both' }}
        >
          <MysticEyeSvg />
        </div>

        <div
          className="mb-5"
          style={{ animation: 'fadeUp 0.8s ease both' }}
        >
          <MoonPhases />
        </div>

        <div
          className="mb-6 font-serif text-[0.7rem] tracking-[0.3em] text-gold"
          style={{ animation: 'fadeUp 0.8s 0.05s ease both' }}
        >
          ✦ {t('ornament')} ✦
        </div>

        <h1
          className="mb-5 font-serif text-[2rem] font-semibold leading-[1.15] tracking-[0.04em] text-paper"
          style={{
            animation: 'fadeUp 0.8s 0.1s ease both',
          }}
        >
          {t('h1Lead')}
          <br />
          {t('h1Trail')} <em className="not-italic text-gold">{t('h1Emphasis')}</em>
        </h1>

        <p
          className="mb-7 text-[0.92rem] font-light leading-[1.9] text-[rgba(245,240,232,0.55)]"
          style={{
            animation: 'fadeUp 0.8s 0.2s ease both',
          }}
        >
          {t('subLine1')}
          <br />
          <strong className="font-medium text-[rgba(245,240,232,0.8)]">{t('subLine2')}</strong>
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
          className="corner-ornament relative inline-block overflow-hidden border-2 border-gold bg-[rgba(201,168,76,0.08)] px-10 py-4 font-serif text-[0.95rem] font-semibold tracking-[0.12em] text-gold2 transition-all duration-[0.25s] hover:-translate-y-1 hover:bg-[rgba(201,168,76,0.15)] hover:shadow-[0_12px_40px_rgba(201,168,76,0.2)]"
          style={{
            animation: 'fadeUp 0.8s 0.35s ease both, heroCtaPulse 2.5s 1.5s ease-in-out infinite',
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
          className="mt-3 text-[0.72rem] tracking-[0.04em] text-[rgba(245,240,232,0.4)]"
          style={{ animation: 'fadeUp 0.8s 0.4s ease both' }}
        >
          {t('ctaNote')}
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="relative z-[2] flex items-center gap-3 px-8 pb-1" aria-hidden>
        <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--gold),transparent)]" />
        <span className="font-serif text-[0.6rem] text-gold opacity-50">✦</span>
        <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--gold),transparent)]" />
      </div>
    </section>
  );
}
