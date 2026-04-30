'use client';

import { useTranslations } from 'next-intl';
import { useFunnelStore } from '@/store/funnel-store';
import LeadCapture from './LeadCapture';

const COMPANY_OFFSETS: ReadonlyArray<{ min: number; max: number }> = [
  { min: -2, max: 1 },
  { min: 0, max: 3 },
  { min: 1, max: 5 },
];

type CompanyEntry = { name: string; match: string; salary: string };

function fillTemplate(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}

export default function PaidResult() {
  const t = useTranslations('paidResult');
  const tInput = useTranslations('input');
  const tTarot = useTranslations('tarot');

  const resultPct = useFunnelStore((s) => s.resultPct);
  const percentile = useFunnelStore((s) => s.percentile);
  const rangeMin = useFunnelStore((s) => s.rangeMin);
  const rangeMax = useFunnelStore((s) => s.rangeMax);
  const field = useFunnelStore((s) => s.field);
  const years = useFunnelStore((s) => s.years);
  const city = useFunnelStore((s) => s.city);
  const salary = useFunnelStore((s) => s.salary);
  const topic = useFunnelStore((s) => s.topic);

  // Position of "you" marker on the range bar (left% from min).
  const positionPct = (() => {
    if (resultPct === null || rangeMin === null || rangeMax === null) return 50;
    const span = rangeMax - rangeMin;
    if (span <= 0) return 50;
    const normalized = (resultPct - rangeMin) / span;
    return Math.max(2, Math.min(98, normalized * 100));
  })();

  const targetSalary =
    salary !== null && resultPct !== null
      ? Math.round(salary * (1 + resultPct / 100))
      : null;

  const cardSummary = topic ? tTarot(`result.heading.${topic}`) : '';

  const companies = t.raw('companies') as ReadonlyArray<CompanyEntry>;

  return (
    <section style={{ animation: 'fadeUp 0.6s ease both' }}>
      {/* Headline: exact % */}
      <div className="mb-2 text-center font-serif text-[0.65rem] tracking-[0.2em] text-[rgba(201,168,76,0.6)]">
        {t('label')}
      </div>
      <div className="mb-1 text-center font-serif text-[3.2rem] font-semibold leading-none text-gold">
        {resultPct !== null ? `+${resultPct}%` : '—'}
      </div>
      <div className="mb-5 text-center text-[1rem] text-[rgba(245,240,232,0.5)]">
        {t('exactUnit')}
      </div>
      <p className="mb-6 text-center text-[0.82rem] leading-[1.8] text-[rgba(245,240,232,0.65)]">
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
        {t('descLine3')}
      </p>

      {/* Position in distribution */}
      <SectionHeading>{t('positionLabel')}</SectionHeading>
      <div className="mb-6 border border-[rgba(201,168,76,0.15)] bg-[rgba(245,240,232,0.03)] p-4">
        {percentile !== null && (
          <div
            className="mb-4 text-center text-[1.05rem] leading-[1.4] text-paper [&_strong]:font-semibold [&_strong]:text-gold"
            dangerouslySetInnerHTML={{
              __html: t('positionHeading', { percentile }),
            }}
          />
        )}
        {/* Range bar with "you" marker */}
        <div className="relative mx-1 mb-2 h-[6px] rounded-full bg-[rgba(245,240,232,0.08)]">
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${positionPct}%` }}
          >
            <div className="h-3 w-3 rounded-full border border-ink bg-gold shadow-[0_0_0_2px_rgba(201,168,76,0.3)]" />
          </div>
        </div>
        <div className="mb-3 flex justify-between text-[0.65rem] text-[rgba(245,240,232,0.4)]">
          <span>
            {rangeMin !== null ? t('rangeAxisMin', { min: rangeMin }) : '—'}
          </span>
          <span
            className="font-serif text-[0.7rem] text-gold"
            style={{ position: 'relative', left: `${positionPct - 50}%` }}
          >
            {t('youMarker')}
          </span>
          <span>
            {rangeMax !== null ? t('rangeAxisMax', { max: rangeMax }) : '—'}
          </span>
        </div>
        <div className="text-center text-[0.75rem] text-[rgba(245,240,232,0.5)]">
          {percentile !== null ? t('positionDesc') : null}
        </div>
      </div>

      {/* Recommended companies */}
      <SectionHeading>{t('companiesLabel')}</SectionHeading>
      <div className="mb-2 text-center text-[0.78rem] text-[rgba(245,240,232,0.55)]">
        {t('companiesHeading')}
      </div>
      <div className="mb-2 space-y-2">
        {companies.map((company, i) => {
          const offset = COMPANY_OFFSETS[i] ?? COMPANY_OFFSETS[0];
          const min =
            targetSalary !== null
              ? Math.max(1, targetSalary + offset.min)
              : null;
          const max =
            targetSalary !== null
              ? Math.max(1, targetSalary + offset.max)
              : null;
          return (
            <div
              key={i}
              className="border border-[rgba(201,168,76,0.18)] bg-[rgba(245,240,232,0.03)] p-3.5"
            >
              <div className="mb-1 font-serif text-[0.85rem] font-semibold text-paper">
                {company.name}
              </div>
              <div className="mb-2 text-[0.72rem] leading-[1.5] text-[rgba(245,240,232,0.5)]">
                {company.match}
              </div>
              {min !== null && max !== null && (
                <div className="text-[0.72rem] font-medium text-teal">
                  {fillTemplate(company.salary, { min, max })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mb-6 text-[0.65rem] leading-[1.6] text-[rgba(245,240,232,0.35)]">
        {t('companiesNote')}
      </div>

      {/* Negotiation guide */}
      <SectionHeading>{t('guideLabel')}</SectionHeading>
      {salary !== null && targetSalary !== null && resultPct !== null && (
        <div
          className="mb-6 border border-[rgba(42,157,143,0.25)] bg-[rgba(42,157,143,0.06)] p-4 text-[0.82rem] leading-[1.75] text-[rgba(245,240,232,0.75)] [&_strong]:font-medium [&_strong]:text-paper"
          dangerouslySetInnerHTML={{
            __html: t('guideText', {
              currentSalary: salary,
              targetSalary,
              pct: resultPct,
            }),
          }}
        />
      )}

      {/* Tarot + data interpretation */}
      <SectionHeading>{t('interpretationLabel')}</SectionHeading>
      {resultPct !== null && percentile !== null && cardSummary && (
        <div
          className="mb-6 border border-[rgba(124,92,191,0.25)] bg-[rgba(124,92,191,0.06)] p-4 text-[0.82rem] leading-[1.75] text-[rgba(245,240,232,0.75)] [&_em]:not-italic [&_em]:text-mystic [&_strong]:font-medium [&_strong]:text-paper"
          dangerouslySetInnerHTML={{
            __html: t('interpretationText', {
              cardSummary,
              pct: resultPct,
              percentile,
            }),
          }}
        />
      )}

      {/* Basis */}
      <div className="mb-6 flex items-start gap-2 border border-[rgba(245,240,232,0.08)] bg-[rgba(245,240,232,0.02)] px-4 py-3">
        <div className="mt-0.5 whitespace-nowrap font-serif text-[0.6rem] text-[rgba(245,240,232,0.5)]">
          {t('basisLabel')}
        </div>
        <div
          className="text-[0.72rem] leading-[1.6] text-[rgba(245,240,232,0.5)] [&_strong]:text-[rgba(245,240,232,0.8)]"
          dangerouslySetInnerHTML={{ __html: t.raw('basisText') as string }}
        />
      </div>

      <LeadCapture />
    </section>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 mt-2 text-center font-serif text-[0.7rem] tracking-[0.2em] text-gold">
      {children}
    </div>
  );
}
