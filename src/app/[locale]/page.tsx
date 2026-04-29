import { getTranslations, setRequestLocale } from 'next-intl/server';
import Nav from '@/components/landing/Nav';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import SocialProofBar from '@/components/landing/SocialProofBar';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import Disclaimer from '@/components/landing/Disclaimer';
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
  const tHow = await getTranslations('howItWorks');
  const tTesti = await getTranslations('testimonials');
  const tFaq = await getTranslations('faq');

  return (
    <div className="landing-bg relative">
      <FunnelReset />
      <div className="page-frame" aria-hidden />
      <Nav />
      <SocialProofBar />
      <Hero />
      <OrnamentDivider>{tHow('divider')}</OrnamentDivider>
      <HowItWorks />
      <OrnamentDivider>{tTesti('divider')}</OrnamentDivider>
      <Testimonials />
      <OrnamentDivider>{tFaq('divider')}</OrnamentDivider>
      <FAQ />
      <Disclaimer />
      <Footer />
    </div>
  );
}
