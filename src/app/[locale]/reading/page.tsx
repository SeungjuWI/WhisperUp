import { setRequestLocale } from 'next-intl/server';
import TarotApp from '@/components/tarot/TarotApp';

export default async function ReadingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TarotApp />;
}
