import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import LocaleSwitcher from '@/components/ui/LocaleSwitcher';

export default async function Nav() {
  const t = await getTranslations('nav');

  return (
    <nav className="sticky top-0 z-[100] flex items-center justify-between border-b border-[rgba(201,168,76,0.25)] bg-[rgba(245,240,232,0.92)] px-5 py-[1.1rem] backdrop-blur-[20px] sm:px-10">
      <div className="flex items-center gap-2 font-serif text-[1.15rem] font-semibold tracking-[0.12em] text-[var(--text)]">
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full bg-gold"
          style={{ animation: 'glow 2s ease-in-out infinite' }}
        />
        Whisper<span className="text-gold">-</span>Up
      </div>

      <div className="hidden text-[0.7rem] tracking-[0.06em] text-[var(--muted)] md:block">
        {t('tag')}
      </div>

      <div className="flex items-center gap-4">
        <LocaleSwitcher variant="light" />
        <Link
          href="/reading"
          className="border border-gold bg-ink px-[1.4rem] py-2 font-serif text-[0.75rem] font-semibold tracking-[0.1em] text-gold2 transition-colors duration-200 hover:bg-gold hover:text-ink"
        >
          {t('cta')}
        </Link>
      </div>
    </nav>
  );
}
