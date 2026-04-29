'use client';

import { useFunnelStore } from '@/store/funnel-store';

export default function Upsell() {
  const setStep = useFunnelStore((s) => s.setStep);

  return (
    <div
      className="relative overflow-hidden border border-[rgba(201,168,76,0.3)] p-6 text-center"
      style={{
        background:
          'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(42,157,143,0.08) 100%)',
      }}
    >
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
      />
      <div className="mb-2 font-serif text-[0.65rem] tracking-[0.2em] text-gold">
        ✦ WHISPER-UP DATA ✦
      </div>
      <h3 className="mb-2 font-serif text-[1.1rem] font-semibold leading-[1.4] tracking-[0.04em] text-paper">
        The cards showed the direction —<br />
        now let the data show you the number
      </h3>
      <p className="mb-4 text-[0.8rem] leading-[1.7] text-[rgba(245,240,232,0.55)]">
        See exactly how much your salary could rise<br />
        based on real job-switcher data in Vietnam.
      </p>
      <div className="mb-4 inline-flex items-baseline gap-2">
        <span className="text-[0.85rem] text-[rgba(245,240,232,0.3)] line-through">
          99,000 VND
        </span>
        <span className="font-serif text-[1.6rem] font-semibold text-gold">29,000</span>
        <span className="text-[0.8rem] text-[rgba(245,240,232,0.4)]">VND</span>
      </div>
      <button
        type="button"
        onClick={() => setStep(3)}
        className="block w-full cursor-pointer border-0 bg-gold px-10 py-3.5 font-serif text-[0.85rem] font-semibold tracking-[0.1em] text-ink transition-all duration-200 hover:-translate-y-px hover:bg-gold2"
      >
        Confirm with Data — Price of a coffee →
      </button>
      <div className="mt-3 text-[0.68rem] text-[rgba(245,240,232,0.3)]">
        Enter role · experience · current salary → get your salary upside %
      </div>
    </div>
  );
}
