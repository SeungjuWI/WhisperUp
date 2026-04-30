import { NextResponse } from 'next/server';
import { appendFileSync } from 'fs';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Append to NDJSON log file — easy to query later, or pipe to Supabase
    const line = JSON.stringify(body) + '\n';
    appendFileSync(join(process.cwd(), 'events.ndjson'), line);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
