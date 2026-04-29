import { NextResponse } from 'next/server';
import {
  computeFull,
  computeTeaser,
  isField,
  isSalaryInput,
} from '@/lib/salary-calculator';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  const tier = (body as { tier?: unknown }).tier;

  if (tier === 'teaser') {
    const field = (body as { field?: unknown }).field;
    if (!isField(field)) {
      return NextResponse.json({ error: 'Invalid field' }, { status: 400 });
    }
    return NextResponse.json(computeTeaser(field));
  }

  if (tier === 'full') {
    if (!isSalaryInput(body)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    // Phase 2: verify VNPay/MoMo paymentToken before returning full result.
    return NextResponse.json(computeFull(body));
  }

  return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
}
