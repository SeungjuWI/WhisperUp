import { Link } from '@/i18n/routing';

// Per-locale 404. Mirrors the brand frame so the dead-end still feels
// on-brand; click-through goes home where FunnelReset clears any state.
export default function LocaleNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-6 text-center">
      <div className="font-serif text-[0.7rem] tracking-[0.3em] text-gold">✦ 404 ✦</div>
      <h1 className="font-serif text-2xl font-semibold text-ink">This path is not in the cards</h1>
      <Link
        href="/"
        className="mt-2 border border-gold bg-ink px-8 py-3 font-serif text-[0.82rem] font-semibold tracking-[0.1em] text-gold2 transition-colors hover:bg-gold hover:text-ink"
      >
        ← Back home
      </Link>
    </main>
  );
}
