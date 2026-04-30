import { getTranslations } from 'next-intl/server';

export default async function Disclaimer() {
  const t = await getTranslations('disclaimer');

  return (
    <section className="relative z-[2] px-4 py-10">
      <div className="border border-[rgba(201,168,76,0.2)] bg-[rgba(14,12,24,0.03)] p-5 text-center">
        <div className="mb-2 font-serif text-[0.65rem] font-semibold tracking-[0.25em] text-gold">
          {t('title')}
        </div>
        <p className="text-[0.78rem] leading-[1.75] text-[var(--muted)]">{t('body')}</p>
      </div>
    </section>
  );
}
