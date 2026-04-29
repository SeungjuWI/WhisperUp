'use client';

import { useState } from 'react';
import { useFunnelStore } from '@/store/funnel-store';
import ProgressDots from '@/components/ui/ProgressDots';
import FormStep from './FormStep';
import type { City, Field, Years } from '@/types';

const FIELDS: readonly Field[] = [
  'Engineering',
  'Marketing',
  'Sales & BD',
  'Design & UX',
  'Finance',
  'HR & Ops',
];

const YEARS: readonly Years[] = [
  'Under 1 yr',
  '1–3 yrs',
  '3–5 yrs',
  '5–8 yrs',
  '8–12 yrs',
  '12+ yrs',
];

const CITIES: readonly City[] = ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Other'];

const SALARY_OPTIONS: ReadonlyArray<{ label: string; value: number }> = [
  { label: 'Under 10M VND', value: 10 },
  { label: '10M–15M VND', value: 15 },
  { label: '15M–20M VND', value: 20 },
  { label: '20M–25M VND', value: 25 },
  { label: '25M–30M VND', value: 30 },
  { label: '30M–40M VND', value: 40 },
  { label: '40M+ VND', value: 50 },
];

const TOTAL_STEPS = 4;
const ANALYSIS_DELAY_MS = 2200;

type SubStep = 0 | 1 | 2 | 3;

export default function InputFlow() {
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
  const setResult = useFunnelStore((s) => s.setResult);
  const showLoading = useFunnelStore((s) => s.showLoading);
  const hideLoading = useFunnelStore((s) => s.hideLoading);
  const markPaid = useFunnelStore((s) => s.markPaid);

  const advance = async () => {
    if (subStep < 3) {
      setSubStep(((subStep as number) + 1) as SubStep);
      return;
    }
    if (!field || !years || !city || salary === null) return;

    markPaid();
    showLoading('Analyzing your data...');

    // Run calc + minimum 2.2s delay in parallel — API is local + cheap so
    // the floor exists for UX consistency, not because the calc is slow.
    const minDelay = new Promise<void>((resolve) =>
      window.setTimeout(resolve, ANALYSIS_DELAY_MS),
    );
    const calc = fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ field, years, city, salary }),
    })
      .then((r) => (r.ok ? (r.json() as Promise<{ resultPct: number }>) : null))
      .catch(() => null);

    const [, data] = await Promise.all([minDelay, calc]);
    if (data && typeof data.resultPct === 'number') {
      setResult(data.resultPct);
    }
    setStep(4);
    hideLoading();
  };

  return (
    <section style={{ animation: 'fadeUp 0.5s ease both' }}>
      <ProgressDots total={TOTAL_STEPS} current={subStep} />

      {subStep === 0 && (
        <FormStep
          question="What kind of work do you do?"
          subtitle="Select your field"
          options={FIELDS}
          selected={field}
          onSelect={setField}
          onNext={advance}
          nextLabel="Next →"
        />
      )}
      {subStep === 1 && (
        <FormStep
          question="How long have you been working?"
          subtitle="Select your experience level"
          options={YEARS}
          selected={years}
          onSelect={setYears}
          onNext={advance}
          nextLabel="Next →"
        />
      )}
      {subStep === 2 && (
        <FormStep
          question="Which city are you in?"
          subtitle="Market data differs by region"
          options={CITIES}
          selected={city}
          onSelect={setCity}
          onNext={advance}
          nextLabel="Next →"
        />
      )}
      {subStep === 3 && (
        <SalaryStep
          options={SALARY_OPTIONS}
          selected={salary}
          onSelect={setSalary}
          onNext={advance}
        />
      )}
    </section>
  );
}

function SalaryStep({
  options,
  selected,
  onSelect,
  onNext,
}: {
  options: ReadonlyArray<{ label: string; value: number }>;
  selected: number | null;
  onSelect: (value: number) => void;
  onNext: () => void;
}) {
  const canAdvance = selected !== null;
  return (
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <h3 className="mb-1 text-center font-serif text-[1rem] font-semibold tracking-[0.04em] text-paper">
        What&apos;s your current salary range?
      </h3>
      <p className="mb-6 text-center text-[0.75rem] text-[rgba(245,240,232,0.4)]">
        The more you share, the more accurate your result
      </p>
      <select
        value={selected ?? ''}
        onChange={(e) => onSelect(Number(e.target.value))}
        aria-label="Current salary range"
        className="dark-select mb-5 w-full border border-[rgba(201,168,76,0.2)] bg-[rgba(245,240,232,0.05)] px-4 py-3 text-[0.85rem] text-paper outline-none transition-colors focus:border-gold"
      >
        <option value="" disabled>
          Select salary range
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
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
        See My Result →
      </button>
    </div>
  );
}
