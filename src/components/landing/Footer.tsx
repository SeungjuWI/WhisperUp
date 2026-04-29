import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[2] border-t border-[rgba(201,168,76,0.15)] text-[0.7rem] tracking-[0.04em] text-[var(--muted)]">
      <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-between gap-4 px-6 py-8 sm:px-10">
        <Link
          href="/"
          className="font-serif font-semibold tracking-[0.1em] text-[var(--text)] transition-colors hover:text-gold"
        >
          Whisper-Up
        </Link>
        <div>
          {t('copy', { year })} ·{' '}
          <a href="#" className="text-[var(--muted)] hover:text-[var(--text)]">
            {t('terms')}
          </a>{' '}
          ·{' '}
          <a href="#" className="text-[var(--muted)] hover:text-[var(--text)]">
            {t('privacy')}
          </a>
        </div>
      </div>
    </footer>
  );
}
