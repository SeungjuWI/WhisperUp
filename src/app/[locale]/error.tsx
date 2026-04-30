'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-4 text-center">
      <div className="font-serif text-[0.7rem] tracking-[0.3em] text-gold">✦ ERROR ✦</div>
      <h2 className="font-serif text-[1.1rem] font-semibold text-paper">
        Something went wrong
      </h2>
      <button
        type="button"
        onClick={reset}
        className="mt-2 border border-gold bg-transparent px-6 py-2 font-serif text-[0.8rem] text-gold transition-colors hover:bg-gold hover:text-ink"
      >
        Try again
      </button>
    </main>
  );
}
