'use client';

import { useFunnelStore } from '@/store/funnel-store';
import LeadCapture from './LeadCapture';

export default function DataResult() {
  const resultPct = useFunnelStore((s) => s.resultPct);
  const field = useFunnelStore((s) => s.field);
  const years = useFunnelStore((s) => s.years);
  const city = useFunnelStore((s) => s.city);

  return (
    <section style={{ animation: 'fadeUp 0.6s ease both' }}>
      <div className="mb-6 text-center">
        <div className="mb-2 font-serif text-[0.65rem] tracking-[0.2em] text-[rgba(201,168,76,0.6)]">
          ✦ If you switch jobs now ✦
        </div>
        <div className="mb-1 font-serif text-[5rem] font-semibold leading-none text-gold">
          {resultPct !== null ? `+${resultPct}%` : '...'}
        </div>
        <div className="text-[1rem] text-[rgba(245,240,232,0.5)]">
          salary increase possible
        </div>
      </div>

      <p className="mb-5 text-center text-[0.85rem] leading-[1.8] text-[rgba(245,240,232,0.65)]">
        Based on people with the same profile —
        {field && years && city && (
          <>
            <br />
            <strong className="font-medium text-paper">
              {field} · {years} · {city}
            </strong>
          </>
        )}
        <br />
        who already made the switch.{' '}
        <strong className="font-medium text-paper">That&apos;s worth moving for.</strong>
      </p>

      <div className="mb-6 flex items-start gap-2 border border-[rgba(42,157,143,0.2)] bg-[rgba(42,157,143,0.08)] px-4 py-3">
        <div className="mt-0.5 whitespace-nowrap font-serif text-[0.6rem] text-teal">[ BASIS ]</div>
        <div className="text-[0.75rem] leading-[1.6] text-[rgba(245,240,232,0.5)]">
          Calculated from{' '}
          <strong className="text-[rgba(245,240,232,0.8)]">real Vietnam job-switcher data</strong>{' '}
          matching your role, experience, and city. No result is shown when sample size is
          insufficient.
        </div>
      </div>

      <LeadCapture />
    </section>
  );
}
