'use client';

import { useTranslations } from 'next-intl';
import { useFunnelStore } from '@/store/funnel-store';

export default function Complete() {
  const t = useTranslations('complete');
  const resultPct = useFunnelStore((s) => s.resultPct);

  const handleShare = async () => {
    const text =
      resultPct !== null
        ? t('shareTextWithPct', { pct: resultPct })
        : t('shareTextNoPct');
    const url = typeof window !== 'undefined' ? window.location.href : '';

    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({ title: t('shareTitle'), text, url });
        return;
      } catch {
        // user canceled or share failed — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      window.alert(t('copied'));
    } catch {
      window.alert(`${text}\n${url}`);
    }
  };

  return (
    <div className="py-6 text-center" style={{ animation: 'fadeUp 0.6s ease both' }}>
      <div className="mb-3 text-[2rem]" aria-hidden>
        ✦
      </div>
      <h3 className="mb-2 font-serif text-[1.1rem] font-semibold tracking-[0.04em] text-paper">
        {t('title')}
      </h3>
      <p className="text-[0.8rem] leading-[1.7] text-[rgba(245,240,232,0.45)]">
        {t('descLine1')}
        <br />
        {t('descLine2')}
      </p>
      <button
        type="button"
        onClick={handleShare}
        className="mt-6 block w-full cursor-pointer border-0 bg-gold px-10 py-3.5 font-serif text-[0.85rem] font-semibold tracking-[0.1em] text-ink transition-all duration-200 hover:-translate-y-px hover:bg-gold2"
      >
        {t('share')}
      </button>
    </div>
  );
}
