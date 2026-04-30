import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[2] flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(201,168,76,0.15)] px-4 py-8 text-[0.7rem] tracking-[0.04em] text-[rgba(245,240,232,0.4)]">
      <Link
        href="/"
        className="font-serif font-semibold tracking-[0.1em] text-paper transition-colors hover:text-gold"
      >
        Whisper-Up
      </Link>
      <div>
        {t('copy', { year })} ·{' '}
        <a href="#" className="text-[rgba(245,240,232,0.4)] hover:text-gold">
          {t('terms')}
        </a>{' '}
        ·{' '}
        <a href="#" className="text-[rgba(245,240,232,0.4)] hover:text-gold">
          {t('privacy')}
        </a>
      </div>
    </footer>
  );
}
