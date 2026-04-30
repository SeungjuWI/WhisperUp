import { NextResponse } from 'next/server';
import { payos } from '@/lib/payos';

const AMOUNT_VND = 29000;

export async function POST(request: Request) {
  try {
    const { sessionId, topic } = await request.json();

    const orderCode = Date.now();
    const origin = request.headers.get('origin') ?? 'http://localhost:3000';

    const paymentLink = await payos.paymentRequests.create({
      orderCode,
      amount: AMOUNT_VND,
      description: `WhisperUp Reading`,
      returnUrl: `${origin}/api/payment/return?orderCode=${orderCode}`,
      cancelUrl: `${origin}/api/payment/return?cancelled=true`,
    });

    return NextResponse.json({
      checkoutUrl: paymentLink.checkoutUrl,
      orderCode,
    });
  } catch (err) {
    console.error('[payment/create]', err);
    return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 });
  }
}
