'use client';

import { useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import ShareCard from './ShareCard';

export default function Complete() {
  const t = useTranslations('complete');
  const shareRef = useRef<HTMLDivElement>(null);

  const handleShare = useCallback(async () => {
    if (!shareRef.current) return;

    const canvas = await html2canvas(shareRef.current, {
      backgroundColor: '#0e0c18',
      scale: 2,
      useCORS: true,
    });

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/png'),
    );

    if (!blob) return;

    const file = new File([blob], 'whisper-up-reading.png', {
      type: 'image/png',
    });

    // Try native share with image
    if (
      typeof navigator !== 'undefined' &&
      'share' in navigator &&
      navigator.canShare?.({ files: [file] })
    ) {
      try {
        await navigator.share({
          title: t('shareTitle'),
          text: t('shareText'),
          files: [file],
        });
        return;
      } catch {
        // user canceled — fall through to download
      }
    }

    // Fallback: download the image
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'whisper-up-reading.png';
    a.click();
    URL.revokeObjectURL(url);
  }, [t]);

  return (
    <div className="py-6 text-center" style={{ animation: 'fadeUp 0.6s ease both' }}>
      <div className="mb-3 text-[2rem]" aria-hidden>
        ✦
      </div>
      <h3 className="mb-2 font-serif text-[1.1rem] font-semibold tracking-[0.04em] text-paper">
        {t('title')}
      </h3>
      <p className="mb-6 text-[0.8rem] leading-[1.7] text-[rgba(245,240,232,0.45)]">
        {t('desc')}
      </p>

      {/* Share image preview — scaled to fit inside the card */}
      <div className="-mx-4 mb-6">
        <ShareCard ref={shareRef} />
      </div>

      <button
        type="button"
        onClick={handleShare}
        className="block w-full cursor-pointer border-0 bg-gold px-8 py-4 font-serif text-[0.85rem] font-semibold tracking-[0.08em] text-ink transition-all duration-200 hover:-translate-y-px hover:bg-gold2"
      >
        {t('share')}
      </button>
      <Link
        href="/"
        className="mt-3 inline-block text-[0.72rem] tracking-[0.1em] text-[rgba(245,240,232,0.4)] transition-colors hover:text-gold"
      >
        {t('startOver')}
      </Link>
    </div>
  );
}
