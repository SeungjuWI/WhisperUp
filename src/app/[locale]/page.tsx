import { getTranslations, setRequestLocale } from 'next-intl/server';
import Nav from '@/components/landing/Nav';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import Footer from '@/components/landing/Footer';
import OrnamentDivider from '@/components/ui/OrnamentDivider';
import FunnelReset from '@/components/funnel/FunnelReset';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('howItWorks');

  return (
    <div className="landing-bg relative">
      <FunnelReset />
      <div className="page-frame" aria-hidden />
      <Nav />
      <Hero />
      <OrnamentDivider>{t('divider')}</OrnamentDivider>
      <HowItWorks />
      <Footer />
    </div>
  );
}
