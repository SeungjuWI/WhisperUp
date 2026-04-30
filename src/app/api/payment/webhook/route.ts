import { NextResponse } from 'next/server';
import { payos } from '@/lib/payos';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // verify() returns WebhookData directly (orderCode, amount, etc.)
    const data = await payos.webhooks.verify(body);

    // Store payment result in Supabase
    await supabase.from('payments').insert({
      order_code: data.orderCode,
      amount: data.amount,
      status: data.code === '00' ? 'paid' : 'failed',
      raw: body,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[payment/webhook]', err);
    return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 });
  }
}
