'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useFunnelStore } from '@/store/funnel-store';
import ProgressDots from '@/components/ui/ProgressDots';
import FormStep, { type FormOption } from './FormStep';
import type { City, Field, Years } from '@/types';

const FIELD_VALUES: readonly Field[] = [
  'Engineering',
  'Marketing',
  'Sales & BD',
  'Design & UX',
  'Finance',
  'HR & Ops',
];

const YEARS_VALUES: readonly Years[] = [
  'Under 1 yr',
  '1–3 yrs',
  '3–5 yrs',
  '5–8 yrs',
  '8–12 yrs',
  '12+ yrs',
];

const CITY_VALUES: readonly City[] = ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Other'];

const SALARY_VALUES: ReadonlyArray<number> = [10, 15, 20, 25, 30, 40, 50];

const TOTAL_STEPS = 4;
const ANALYSIS_DELAY_MS = 2200;

type SubStep = 0 | 1 | 2 | 3;

export default function InputFlow() {
  const t = useTranslations();
  const [subStep, setSubStep] = useState<SubStep>(0);

  const field = useFunnelStore((s) => s.field);
  const years = useFunnelStore((s) => s.years);
  const city = useFunnelStore((s) => s.city);
  const salary = useFunnelStore((s) => s.salary);

  const setField = useFunnelStore((s) => s.setField);
  const setYears = useFunnelStore((s) => s.setYears);
  const setCity = useFunnelStore((s) => s.setCity);
  const setSalary = useFunnelStore((s) => s.setSalary);
  const setStep = useFunnelStore((s) => s.setStep);
  const setTeaserData = useFunnelStore((s) => s.setTeaserData);
  const showLoading = useFunnelStore((s) => s.showLoading);
  const hideLoading = useFunnelStore((s) => s.hideLoading);

  // Build localized option lists. Stored value stays the canonical English
  // literal so /api/calculate and the future Supabase schema keep stable keys.
  const fieldOptions: ReadonlyArray<FormOption<Field>> = FIELD_VALUES.map((v) => ({
    value: v,
    label: t(`input.field.options.${v}`),
  }));
  const yearsOptions: ReadonlyArray<FormOption<Years>> = YEARS_VALUES.map((v) => ({
    value: v,
    label: t(`input.years.options.${v}`),
  }));
  const cityOptions: ReadonlyArray<FormOption<City>> = CITY_VALUES.map((v) => ({
    value: v,
    label: t(`input.city.options.${v}`),
  }));

  const advance = async () => {
    if (subStep < 3) {
      setSubStep(((subStep as number) + 1) as SubStep);
      return;
    }
    if (!field || !years || !city || salary === null) return;

    showLoading(t('loading.analyzing'));

    const minDelay = new Promise<void>((resolve) =>
      window.setTimeout(resolve, ANALYSIS_DELAY_MS),
    );
    const calc = fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier: 'teaser', field }),
    })
      .then((r) =>
        r.ok
          ? (r.json() as Promise<{
              marketAvg: number;
              rangeMin: number;
              rangeMax: number;
            }>)
          : null,
      )
      .catch(() => null);

    const [, data] = await Promise.all([minDelay, calc]);
    if (data && typeof data.marketAvg === 'number') {
      setTeaserData(data);
    }
    setStep(4);
    hideLoading();
  };

  return (
    <section style={{ animation: 'fadeUp 0.5s ease both' }}>
      <ProgressDots total={TOTAL_STEPS} current={subStep} />

      {subStep === 0 && (
        <FormStep
          question={t('input.field.question')}
          subtitle={t('input.field.subtitle')}
          options={fieldOptions}
          selected={field}
          onSelect={setField}
          onNext={advance}
          nextLabel={t('input.next')}
        />
      )}
      {subStep === 1 && (
        <FormStep
          question={t('input.years.question')}
          subtitle={t('input.years.subtitle')}
          options={yearsOptions}
          selected={years}
          onSelect={setYears}
          onNext={advance}
          nextLabel={t('input.next')}
        />
      )}
      {subStep === 2 && (
        <FormStep
          question={t('input.city.question')}
          subtitle={t('input.city.subtitle')}
          options={cityOptions}
          selected={city}
          onSelect={setCity}
          onNext={advance}
          nextLabel={t('input.next')}
        />
      )}
      {subStep === 3 && (
        <SalaryStep selected={salary} onSelect={setSalary} onNext={advance} />
      )}
    </section>
  );
}

function SalaryStep({
  selected,
  onSelect,
  onNext,
}: {
  selected: number | null;
  onSelect: (value: number) => void;
  onNext: () => void;
}) {
  const t = useTranslations('input.salary');
  const canAdvance = selected !== null;

  return (
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <h3 className="mb-1 text-center font-serif text-[1rem] font-semibold tracking-[0.04em] text-paper">
        {t('question')}
      </h3>
      <p className="mb-6 text-center text-[0.75rem] text-[rgba(245,240,232,0.4)]">
        {t('subtitle')}
      </p>
      <select
        value={selected ?? ''}
        onChange={(e) => onSelect(Number(e.target.value))}
        aria-label={t('ariaLabel')}
        className="dark-select mb-5 w-full border border-[rgba(201,168,76,0.2)] bg-[rgba(245,240,232,0.05)] px-4 py-3 text-[0.85rem] text-paper outline-none transition-colors focus:border-gold"
      >
        <option value="" disabled>
          {t('placeholder')}
        </option>
        {SALARY_VALUES.map((v) => (
          <option key={v} value={v}>
            {t(`options.${v}`)}
          </option>
        ))}
      </select>
      <button
        type="button"
        disabled={!canAdvance}
        onClick={onNext}
        className={`w-full border bg-ink px-8 py-3 font-serif text-[0.82rem] font-semibold tracking-[0.1em] text-gold2 transition-all duration-200 ${
          canAdvance
            ? 'cursor-pointer border-[rgba(201,168,76,0.4)] hover:border-gold hover:bg-[rgba(201,168,76,0.1)]'
            : 'cursor-not-allowed border-[rgba(201,168,76,0.2)] opacity-40'
        }`}
      >
        {t('cta')}
      </button>
    </div>
  );
}
