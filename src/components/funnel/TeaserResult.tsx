'use client';

import { useTranslations } from 'next-intl';
import { useFunnelStore } from '@/store/funnel-store';

const PAYMENT_DELAY_MS = 1400;
const LOCKED_KEYS = ['exact', 'position', 'companies', 'guide', 'interpretation'] as const;

export default function TeaserResult() {
  const t = useTranslations('teaser');
  const tLoading = useTranslations('loading');

  const marketAvg = useFunnelStore((s) => s.marketAvg);
  const rangeMin = useFunnelStore((s) => s.rangeMin);
  const rangeMax = useFunnelStore((s) => s.rangeMax);
  const field = useFunnelStore((s) => s.field);
  const years = useFunnelStore((s) => s.years);
  const city = useFunnelStore((s) => s.city);
  const salary = useFunnelStore((s) => s.salary);

  const setStep = useFunnelStore((s) => s.setStep);
  const markPaid = useFunnelStore((s) => s.markPaid);
  const setFullResult = useFunnelStore((s) => s.setFullResult);
  const showLoading = useFunnelStore((s) => s.showLoading);
  const hideLoading = useFunnelStore((s) => s.hideLoading);

  const handlePay = async () => {
    if (!field || !years || !city || salary === null) return;

    // Phase 1 mock payment. Phase 2 wires VNPay/MoMo and returns a verified
    // paymentToken, which /api/calculate (tier=full) will validate.
    showLoading(tLoading('analyzing'));

    const minDelay = new Promise<void>((resolve) =>
      window.setTimeout(resolve, PAYMENT_DELAY_MS),
    );
    const calc = fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier: 'full', field, years, city, salary }),
    })
      .then((r) =>
        r.ok
          ? (r.json() as Promise<{
              resultPct: number;
              percentile: number;
            }>)
          : null,
      )
      .catch(() => null);

    const [, data] = await Promise.all([minDelay, calc]);
    if (data && typeof data.resultPct === 'number') {
      setFullResult({ resultPct: data.resultPct, percentile: data.percentile });
      markPaid();
      setStep(5);
    }
    hideLoading();
  };

  return (
    <section style={{ animation: 'fadeUp 0.5s ease both' }}>
      <div className="mb-2 text-center font-serif text-[0.65rem] tracking-[0.2em] text-[rgba(201,168,76,0.6)]">
        {t('label')}
      </div>

      {/* Market average — broad, free */}
      <div className="mb-4 border border-[rgba(201,168,76,0.15)] bg-[rgba(245,240,232,0.03)] p-6 text-center">
        <div className="mb-2 text-[0.7rem] tracking-[0.1em] text-[rgba(245,240,232,0.5)]">
          {t('marketAvgLabel')}
        </div>
        <div className="mb-1 font-serif text-[3.6rem] font-semibold leading-none text-gold">
          {marketAvg !== null ? `+${marketAvg}%` : '—'}
        </div>
        <div className="text-[0.78rem] text-[rgba(245,240,232,0.45)]">
          {t('marketAvgUnit')}
        </div>

        <div className="mt-5 border-t border-[rgba(201,168,76,0.12)] pt-4">
          <div className="mb-1 text-[0.65rem] tracking-[0.15em] text-[rgba(245,240,232,0.4)]">
            {t('rangeLabel')}
          </div>
          <div className="font-serif text-[1.1rem] font-semibold text-paper">
            {rangeMin !== null && rangeMax !== null
              ? t('rangeValue', { min: rangeMin, max: rangeMax })
              : '—'}
          </div>
          <div className="mt-1 text-[0.7rem] text-[rgba(245,240,232,0.4)]">
            ↑ {t('rangeNote')}
          </div>
        </div>
      </div>

      {/* Locked items — what payment unlocks */}
      <div className="mb-5 border border-[rgba(201,168,76,0.2)] bg-[rgba(14,12,24,0.6)] p-5">
        <div className="mb-3 font-serif text-[0.7rem] tracking-[0.2em] text-gold">
          {t('lockedLabel')}
        </div>
        <ul className="space-y-3">
          {LOCKED_KEYS.map((key) => (
            <li key={key} className="flex gap-3">
              <span aria-hidden className="mt-0.5 text-gold">
                ✦
              </span>
              <div>
                <div className="font-serif text-[0.85rem] font-semibold text-paper">
                  {t(`lockedItems.${key}.title`)}
                </div>
                <div className="text-[0.72rem] leading-[1.55] text-[rgba(245,240,232,0.5)]">
                  {t(`lockedItems.${key}.desc`)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Payment CTA */}
      <div
        className="relative overflow-hidden border border-[rgba(201,168,76,0.3)] p-5 text-center"
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
        <div className="mb-3 inline-flex items-baseline gap-2">
          <span className="text-[0.85rem] text-[rgba(245,240,232,0.3)] line-through">
            {t('priceOld')}
          </span>
          <span className="font-serif text-[1.6rem] font-semibold text-gold">{t('priceNew')}</span>
          <span className="text-[0.8rem] text-[rgba(245,240,232,0.4)]">{t('priceUnit')}</span>
        </div>
        <button
          type="button"
          onClick={handlePay}
          className="block w-full cursor-pointer border-0 bg-gold px-10 py-3.5 font-serif text-[0.85rem] font-semibold tracking-[0.1em] text-ink transition-all duration-200 hover:-translate-y-px hover:bg-gold2"
        >
          {t('cta')}
        </button>
        <div className="mt-3 text-[0.68rem] leading-[1.6] text-[rgba(245,240,232,0.4)]">
          {t('note')}
        </div>
      </div>
    </section>
  );
}
