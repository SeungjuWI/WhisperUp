import { getTranslations } from 'next-intl/server';

export default async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[2] flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(201,168,76,0.15)] px-10 py-8 text-[0.7rem] tracking-[0.04em] text-[var(--muted)]">
      <div className="font-serif font-semibold tracking-[0.1em]">Whisper-Up</div>
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
    </footer>
  );
}
