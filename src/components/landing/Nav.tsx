import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import LocaleSwitcher from '@/components/ui/LocaleSwitcher';

export default async function Nav() {
  const t = await getTranslations('nav');

  return (
    <nav className="sticky top-0 z-[100] mx-auto flex max-w-[430px] items-center justify-between border-b border-[rgba(201,168,76,0.25)] bg-[rgba(245,240,232,0.92)] px-4 py-3 backdrop-blur-[20px]">
      <Link
        href="/"
        aria-label="Whisper-Up — home"
        className="flex items-center gap-2 font-serif text-[1.05rem] font-semibold tracking-[0.1em] text-[var(--text)] transition-colors hover:text-gold"
      >
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full bg-gold"
          style={{ animation: 'glow 2s ease-in-out infinite' }}
        />
        Whisper<span className="text-gold">-</span>Up
      </Link>

      <div className="flex items-center gap-3">
        <LocaleSwitcher variant="light" />
        <Link
          href="/reading"
          className="whitespace-nowrap border border-gold bg-ink px-3.5 py-1.5 font-serif text-[0.7rem] font-semibold tracking-[0.08em] text-gold2 transition-colors duration-200 hover:bg-gold hover:text-ink"
        >
          {t('cta')}
        </Link>
      </div>
    </nav>
  );
}
