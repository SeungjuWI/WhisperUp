import { getTranslations } from 'next-intl/server';

type Testimonial = {
  quote: string;
  name: string;
  meta: string;
};

// Sample testimonials for MVP / soft launch — replace with real beta-tester
// quotes (with consent) before public launch. Source of truth lives in
// messages/{locale}.json under testimonials.items.
export default async function Testimonials() {
  const t = await getTranslations('testimonials');
  const items = t.raw('items') as readonly Testimonial[];

  return (
    <section className="relative z-[2] mx-auto max-w-[900px] px-6 py-16">
      <div className="mb-8 text-center font-serif text-[0.68rem] tracking-[0.2em] text-gold">
        {t('label')}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.name + item.meta}
            className="border border-[rgba(201,168,76,0.15)] bg-[rgba(14,12,24,0.04)] p-5 transition-colors hover:border-[rgba(201,168,76,0.35)]"
          >
            <p className="mb-3 text-[0.85rem] leading-[1.7] text-[var(--text)]">
              <span aria-hidden className="font-serif text-gold">
                &ldquo;
              </span>
              {item.quote}
              <span aria-hidden className="font-serif text-gold">
                &rdquo;
              </span>
            </p>
            <div className="text-[0.72rem] tracking-[0.04em] text-[var(--muted)]">
              <span className="font-serif font-semibold text-[var(--text)]">{item.name}</span>{' '}
              · {item.meta}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
