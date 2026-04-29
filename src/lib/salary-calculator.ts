import type { City, Field, Years } from '@/types';

// Phase 1 mock table (matches prototype). Real data wiring is a Phase 2 task.
const PCT_TABLE: Record<Field, { base: number; adj: Record<number, number> }> = {
  Engineering: { base: 26, adj: { 1: 22, 3: 26, 5: 28, 8: 24, 12: 20 } },
  Marketing: { base: 23, adj: { 1: 18, 3: 22, 5: 25, 8: 22, 12: 18 } },
  'Sales & BD': { base: 25, adj: { 1: 20, 3: 24, 5: 28, 8: 25, 12: 22 } },
  'Design & UX': { base: 22, adj: { 1: 18, 3: 21, 5: 24, 8: 20, 12: 17 } },
  Finance: { base: 20, adj: { 1: 16, 3: 19, 5: 22, 8: 20, 12: 17 } },
  'HR & Ops': { base: 19, adj: { 1: 15, 3: 18, 5: 21, 8: 19, 12: 16 } },
};

const YRS_MAP: Record<Years, number> = {
  'Under 1 yr': 1,
  '1–3 yrs': 3,
  '3–5 yrs': 5,
  '5–8 yrs': 8,
  '8–12 yrs': 12,
  '12+ yrs': 12,
};

// Bounds reflect the full set of possible adjustments: HCMC +2, low salary +3,
// high salary -2 — so we widen the years-adj range by these to mirror what the
// market can produce within a field.
const CITY_MAX_BOOST = 2;
const SALARY_MAX_BOOST = 3;
const SALARY_MIN_BOOST = -2;

export type SalaryInput = {
  field: Field;
  years: Years;
  city: City;
  /** Bucket value in millions VND, e.g. 10/15/20/25/30/40/50 */
  salary: number;
};

export type TeaserResult = {
  marketAvg: number;
  rangeMin: number;
  rangeMax: number;
};

export type FullResult = TeaserResult & {
  resultPct: number;
  /** "Top N%" — 1 means top of distribution, 99 means bottom. */
  percentile: number;
};

export function computeTeaser(field: Field): TeaserResult {
  const tbl = PCT_TABLE[field];
  const yearsAdjValues = Object.values(tbl.adj);
  const rangeMin = Math.min(...yearsAdjValues) + SALARY_MIN_BOOST;
  const rangeMax = Math.max(...yearsAdjValues) + CITY_MAX_BOOST + SALARY_MAX_BOOST;
  const marketAvg = Math.round((rangeMin + rangeMax) / 2);
  return { marketAvg, rangeMin, rangeMax };
}

export function calculateSalaryUpside({ field, years, city, salary }: SalaryInput): number {
  const tbl = PCT_TABLE[field];
  const yrsNum = YRS_MAP[years];
  let pct = tbl.adj[yrsNum] ?? tbl.base;
  if (city === 'Ho Chi Minh City') pct += 2;
  if (salary < 15) pct += 3;
  else if (salary > 30) pct -= 2;
  return pct;
}

export function computeFull(input: SalaryInput): FullResult {
  const teaser = computeTeaser(input.field);
  const resultPct = calculateSalaryUpside(input);
  const span = teaser.rangeMax - teaser.rangeMin;
  const normalized = span > 0 ? (resultPct - teaser.rangeMin) / span : 0.5;
  // Higher pct == better, so top percentile = (1 - normalized).
  const percentile = Math.round((1 - normalized) * 100);
  return {
    ...teaser,
    resultPct,
    percentile: Math.max(1, Math.min(99, percentile)),
  };
}

const FIELDS = new Set<string>([
  'Engineering',
  'Marketing',
  'Sales & BD',
  'Design & UX',
  'Finance',
  'HR & Ops',
]);
const YEARS_SET = new Set<string>([
  'Under 1 yr',
  '1–3 yrs',
  '3–5 yrs',
  '5–8 yrs',
  '8–12 yrs',
  '12+ yrs',
]);
const CITIES = new Set<string>(['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Other']);

export function isField(value: unknown): value is Field {
  return typeof value === 'string' && FIELDS.has(value);
}

export function isSalaryInput(b: unknown): b is SalaryInput {
  if (typeof b !== 'object' || b === null) return false;
  const obj = b as Record<string, unknown>;
  return (
    typeof obj.field === 'string' &&
    FIELDS.has(obj.field) &&
    typeof obj.years === 'string' &&
    YEARS_SET.has(obj.years) &&
    typeof obj.city === 'string' &&
    CITIES.has(obj.city) &&
    typeof obj.salary === 'number' &&
    Number.isFinite(obj.salary)
  );
}
