'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useFunnelStore } from '@/store/funnel-store';
import { Link } from '@/i18n/routing';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import Complete from '@/components/funnel/Complete';
import TopicSelect from './TopicSelect';
import CardDeck from './CardDeck';
import Paywall from './Paywall';
import TarotResult from './TarotResult';

export default function TarotApp() {
  const t = useTranslations('tarot');
  const currentStep = useFunnelStore((s) => s.currentStep);
  const loading = useFunnelStore((s) => s.loading);

  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (currentStep === 0) return;
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentStep]);

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

      <div className="relative z-10 mx-auto max-w-[430px] px-4 pt-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-[rgba(201,168,76,0.25)] bg-[rgba(245,240,232,0.04)] px-3 py-1.5 font-serif text-[0.7rem] tracking-[0.15em] text-[rgba(245,240,232,0.7)] transition-all hover:border-gold hover:bg-[rgba(201,168,76,0.08)] hover:text-gold"
          >
            {t('back')}
          </Link>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[430px] px-3 py-6">
        <div
          ref={cardRef}
          className="relative border border-[rgba(201,168,76,0.2)] bg-ink p-4"
        >
          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="bl" />
          <Corner pos="br" />

          <div className="relative">
            {currentStep === 0 && <TopicSelect />}
            {currentStep === 1 && <CardDeck />}
            {currentStep === 2 && <Paywall />}
            {currentStep === 3 && <TarotResult />}
            {currentStep === 4 && <Complete />}
          </div>
          <LoadingOverlay active={loading.active} text={loading.text} />
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
