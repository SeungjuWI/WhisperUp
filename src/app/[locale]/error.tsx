'use client';

import { useEffect } from 'react';

// Per-locale route error boundary. Required by App Router so dev-server
// HMR can mount it; without one, "missing required error components" can
// surface during cache-corruption scenarios.
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('[whisper-up] route error', error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-6 text-center">
      <div className="font-serif text-[0.7rem] tracking-[0.3em] text-gold">✦ ERROR ✦</div>
      <h1 className="font-serif text-2xl font-semibold text-ink">Something went sideways</h1>
      <p className="max-w-[420px] text-[0.85rem] leading-[1.7] text-[var(--muted)]">
        The cards got tangled. Try again — if it keeps happening, refresh the page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-2 border border-gold bg-ink px-8 py-3 font-serif text-[0.82rem] font-semibold tracking-[0.1em] text-gold2 transition-colors hover:bg-gold hover:text-ink"
      >
        Try again
      </button>
    </main>
  );
}
