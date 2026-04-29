'use client';

import { useFunnelStore } from '@/store/funnel-store';

export default function Complete() {
  const resultPct = useFunnelStore((s) => s.resultPct);

  const handleShare = async () => {
    const pct = resultPct !== null ? `+${resultPct}%` : '+28%';
    const text = `I just found out I could get ${pct} more if I switch jobs. You should check yours too.`;
    const url = typeof window !== 'undefined' ? window.location.href : '';

    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({ title: 'Whisper-Up Career Analysis', text, url });
        return;
      } catch {
        // user canceled or share failed — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      window.alert('Copied to clipboard');
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
        You&apos;re all set
      </h3>
      <p className="text-[0.8rem] leading-[1.7] text-[rgba(245,240,232,0.45)]">
        We&apos;ll reach out when a matching company comes up.
        <br />
        Share your result with a friend who&apos;s also thinking about switching.
      </p>
      <button
        type="button"
        onClick={handleShare}
        className="mt-6 block w-full cursor-pointer border-0 bg-gold px-10 py-3.5 font-serif text-[0.85rem] font-semibold tracking-[0.1em] text-ink transition-all duration-200 hover:-translate-y-px hover:bg-gold2"
      >
        Share My Result →
      </button>
    </div>
  );
}
