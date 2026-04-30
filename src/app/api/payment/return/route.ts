import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cancelled = searchParams.get('cancelled');
  const orderCode = searchParams.get('orderCode');

  // Determine locale from referer or default to 'vi'
  const referer = request.headers.get('referer') ?? '';
  const localeMatch = referer.match(/\/(vi|en|ko)\//);
  const locale = localeMatch?.[1] ?? 'vi';

  if (cancelled) {
    // User cancelled payment — back to reading page
    return NextResponse.redirect(new URL(`/${locale}/reading?payment=cancelled`, request.url));
  }

  // Successful return — redirect to reading page with payment token
  return NextResponse.redirect(
    new URL(`/${locale}/reading?payment=success&orderCode=${orderCode}`, request.url),
  );
}
