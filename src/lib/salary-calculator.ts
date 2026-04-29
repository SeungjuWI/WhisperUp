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

export type SalaryInput = {
  field: Field;
  years: Years;
  city: City;
  /** Bucket value in millions VND, e.g. 10/15/20/25/30/40/50 */
  salary: number;
};

export function calculateSalaryUpside({ field, years, city, salary }: SalaryInput): number {
  const tbl = PCT_TABLE[field];
  const yrsNum = YRS_MAP[years];
  let pct = tbl.adj[yrsNum] ?? tbl.base;
  if (city === 'Ho Chi Minh City') pct += 2;
  if (salary < 15) pct += 3;
  else if (salary > 30) pct -= 2;
  return pct;
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
