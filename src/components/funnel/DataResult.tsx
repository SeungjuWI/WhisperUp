'use client';

import { useTranslations } from 'next-intl';
import { useFunnelStore } from '@/store/funnel-store';
import LeadCapture from './LeadCapture';

export default function DataResult() {
  const t = useTranslations('dataResult');
  const tInput = useTranslations('input');
  const resultPct = useFunnelStore((s) => s.resultPct);
  const field = useFunnelStore((s) => s.field);
  const years = useFunnelStore((s) => s.years);
  const city = useFunnelStore((s) => s.city);
  const salary = useFunnelStore((s) => s.salary);

  return (
    <section style={{ animation: 'fadeUp 0.6s ease both' }}>
      <div className="mb-6 text-center">
        <div className="mb-2 font-serif text-[0.65rem] tracking-[0.2em] text-[rgba(201,168,76,0.6)]">
          {t('label')}
        </div>
        <div className="mb-1 font-serif text-[5rem] font-semibold leading-none text-gold">
          {resultPct !== null ? `+${resultPct}%` : t('pendingValue')}
        </div>
        <div className="text-[1rem] text-[rgba(245,240,232,0.5)]">{t('unit')}</div>
      </div>

      <p className="mb-5 text-center text-[0.85rem] leading-[1.8] text-[rgba(245,240,232,0.65)]">
        {t('descLine1')}
        {field && years && city && (
          <>
            <br />
            <strong className="font-medium text-paper">
              {t('descProfile', {
                field: tInput(`field.options.${field}`),
                years: tInput(`years.options.${years}`),
                city: tInput(`city.options.${city}`),
              })}
            </strong>
          </>
        )}
        <br />
        {t('descLine3')} <strong className="font-medium text-paper">{t('emphasis')}</strong>
        {/* salary kept on the type for downstream use; not surfaced in copy */}
        {salary === null ? null : null}
      </p>

      <div className="mb-6 flex items-start gap-2 border border-[rgba(42,157,143,0.2)] bg-[rgba(42,157,143,0.08)] px-4 py-3">
        <div className="mt-0.5 whitespace-nowrap font-serif text-[0.6rem] text-teal">
          {t('basisLabel')}
        </div>
        <div
          className="text-[0.75rem] leading-[1.6] text-[rgba(245,240,232,0.5)] [&_strong]:text-[rgba(245,240,232,0.8)]"
          dangerouslySetInnerHTML={{ __html: t.raw('basisText') as string }}
        />
      </div>

      <LeadCapture />
    </section>
  );
}
