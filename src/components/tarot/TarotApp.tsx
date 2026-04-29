'use client';

import { useFunnelStore } from '@/store/funnel-store';
import { Link } from '@/i18n/routing';
import TopicSelect from './TopicSelect';

export default function TarotApp() {
  const currentStep = useFunnelStore((s) => s.currentStep);

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124, 92, 191, 0.15) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 px-6 pt-6">
        <Link
          href="/"
          className="font-serif text-[0.7rem] tracking-[0.15em] text-[rgba(245,240,232,0.4)] transition-colors hover:text-gold"
        >
          ← Whisper-Up
        </Link>
      </div>

      <div className="relative z-10 mx-auto max-w-[720px] px-4 py-12 sm:px-6">
        <div className="relative border border-[rgba(201,168,76,0.2)] bg-ink p-6 sm:p-10">
          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="bl" />
          <Corner pos="br" />

          <div className="relative">
            {currentStep === 0 && <TopicSelect />}
            {currentStep === 1 && <StepPlaceholder step={1} />}
            {currentStep === 2 && <StepPlaceholder step={2} />}
            {currentStep === 3 && <StepPlaceholder step={3} />}
            {currentStep === 4 && <StepPlaceholder step={4} />}
            {currentStep === 5 && <StepPlaceholder step={5} />}
          </div>
        </div>
      </div>
    </main>
  );
}

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const cls = {
    tl: 'top-3 left-3 border-t border-l',
    tr: 'top-3 right-3 border-t border-r',
    bl: 'bottom-3 left-3 border-b border-l',
    br: 'bottom-3 right-3 border-b border-r',
  }[pos];
  return <span aria-hidden className={`absolute h-5 w-5 border-[rgba(201,168,76,0.4)] ${cls}`} />;
}

function StepPlaceholder({ step }: { step: number }) {
  return (
    <div
      className="py-16 text-center font-serif text-[0.78rem] tracking-[0.15em] text-[rgba(245,240,232,0.4)]"
      style={{ animation: 'fadeUp 0.5s ease both' }}
    >
      ✦ Step {step} — coming soon ✦
    </div>
  );
}
