import { NextResponse } from 'next/server';
import { calculateSalaryUpside, isSalaryInput } from '@/lib/salary-calculator';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!isSalaryInput(body)) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const resultPct = calculateSalaryUpside(body);
  return NextResponse.json({ resultPct });
}
