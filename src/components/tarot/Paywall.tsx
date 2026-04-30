'use client';

import { useTranslations } from 'next-intl';
import { useFunnelStore } from '@/store/funnel-store';

const PAYMENT_DELAY_MS = 1400;
const UNLOCK_KEYS = ['reading', 'synthesis', 'guidance'] as const;

export default function Paywall() {
  const t = useTranslations('paywall');
  const tLoading = useTranslations('loading');

  const setStep = useFunnelStore((s) => s.setStep);
  const markPaid = useFunnelStore((s) => s.markPaid);
  const showLoading = useFunnelStore((s) => s.showLoading);
  const hideLoading = useFunnelStore((s) => s.hideLoading);

  const handlePay = async () => {
    // Phase 1 mock payment. Phase 2 wires VNPay/MoMo.
    showLoading(tLoading('paying'));

    await new Promise<void>((resolve) =>
      window.setTimeout(resolve, PAYMENT_DELAY_MS),
    );

    markPaid();
    setStep(3);
    hideLoading();
  };

  return (
    <section style={{ animation: 'fadeUp 0.5s ease both' }}>
      <div className="mb-2 text-center font-serif text-[0.65rem] tracking-[0.2em] text-[rgba(201,168,76,0.6)]">
        {t('label')}
      </div>
      <h2 className="mb-2 text-center font-serif text-[1.1rem] font-semibold leading-[1.4] tracking-[0.04em] text-paper">
        {t('heading')}
      </h2>
      <p className="mb-6 text-center text-[0.78rem] leading-[1.7] text-[rgba(245,240,232,0.5)]">
        {t('desc')}
      </p>

      {/* What payment unlocks */}
      <div className="mb-5 border border-[rgba(201,168,76,0.2)] bg-[rgba(14,12,24,0.6)] p-4">
        <div className="mb-3 font-serif text-[0.7rem] tracking-[0.2em] text-gold">
          {t('unlockLabel')}
        </div>
        <ul className="space-y-3">
          {UNLOCK_KEYS.map((key) => (
            <li key={key} className="flex gap-3">
              <span aria-hidden className="mt-0.5 text-gold">
                ✦
              </span>
              <div>
                <div className="font-serif text-[0.85rem] font-semibold text-paper">
                  {t(`unlockItems.${key}.title`)}
                </div>
                <div className="text-[0.72rem] leading-[1.55] text-[rgba(245,240,232,0.5)]">
                  {t(`unlockItems.${key}.desc`)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Payment CTA */}
      <div
        className="relative overflow-hidden border border-[rgba(201,168,76,0.3)] p-4 text-center"
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
        <div className="mb-1 inline-flex items-baseline gap-2">
          <span className="text-[0.85rem] text-[rgba(245,240,232,0.3)] line-through">
            {t('priceOld')}
          </span>
          <span className="font-serif text-[1.6rem] font-semibold text-gold">{t('priceNew')}</span>
          <span className="text-[0.8rem] text-[rgba(245,240,232,0.4)]">{t('priceUnit')}</span>
        </div>
        <div className="mb-4 text-[0.72rem] tracking-[0.05em] text-[rgba(245,240,232,0.55)]">
          ☕ {t('priceCompare')}
        </div>
        <button
          type="button"
          onClick={handlePay}
          className="block w-full cursor-pointer border-0 bg-gold px-6 py-4 font-serif text-[0.82rem] font-semibold tracking-[0.06em] text-ink transition-all duration-200 hover:-translate-y-px hover:bg-gold2"
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
