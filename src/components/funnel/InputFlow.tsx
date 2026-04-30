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
  const setFullResult = useFunnelStore((s) => s.setFullResult);
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

  // User has already paid at step 2, so we call tier=full directly and skip
  // the teaser step entirely.
  const runAnalysis = async () => {
    const snapshot = useFunnelStore.getState();
    if (!snapshot.field || !snapshot.years || !snapshot.city || snapshot.salary === null) {
      return;
    }

    showLoading(t('loading.analyzing'));

    const minDelay = new Promise<void>((resolve) =>
      window.setTimeout(resolve, ANALYSIS_DELAY_MS),
    );
    const calc = fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tier: 'full',
        field: snapshot.field,
        years: snapshot.years,
        city: snapshot.city,
        salary: snapshot.salary,
      }),
    })
      .then((r) =>
        r.ok
          ? (r.json() as Promise<{
              marketAvg: number;
              rangeMin: number;
              rangeMax: number;
              resultPct: number;
              percentile: number;
            }>)
          : null,
      )
      .catch(() => null);

    const [, data] = await Promise.all([minDelay, calc]);
    if (data && typeof data.resultPct === 'number') {
      setTeaserData({ marketAvg: data.marketAvg, rangeMin: data.rangeMin, rangeMax: data.rangeMax });
      setFullResult({ resultPct: data.resultPct, percentile: data.percentile });
    }
    setStep(5);
    hideLoading();
  };

  const chooseField = (value: Field) => {
    setField(value);
    setSubStep(1);
  };
  const chooseYears = (value: Years) => {
    setYears(value);
    setSubStep(2);
  };
  const chooseCity = (value: City) => {
    setCity(value);
    setSubStep(3);
  };
  const chooseSalary = (value: number) => {
    setSalary(value);
    void runAnalysis();
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
          onChoose={chooseField}
        />
      )}
      {subStep === 1 && (
        <FormStep
          question={t('input.years.question')}
          subtitle={t('input.years.subtitle')}
          options={yearsOptions}
          selected={years}
          onChoose={chooseYears}
        />
      )}
      {subStep === 2 && (
        <FormStep
          question={t('input.city.question')}
          subtitle={t('input.city.subtitle')}
          options={cityOptions}
          selected={city}
          onChoose={chooseCity}
        />
      )}
      {subStep === 3 && (
        <SalaryStep selected={salary} onChoose={chooseSalary} />
      )}
    </section>
  );
}

function SalaryStep({
  selected,
  onChoose,
}: {
  selected: number | null;
  onChoose: (value: number) => void;
}) {
  const t = useTranslations('input.salary');

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
        onChange={(e) => {
          const v = Number(e.target.value);
          if (Number.isFinite(v)) onChoose(v);
        }}
        aria-label={t('ariaLabel')}
        className="dark-select w-full border border-[rgba(201,168,76,0.2)] bg-[rgba(245,240,232,0.05)] px-4 py-3.5 text-[0.85rem] text-paper outline-none transition-colors focus:border-gold"
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
    </div>
  );
}
