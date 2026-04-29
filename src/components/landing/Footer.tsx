export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[2] flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(201,168,76,0.15)] px-10 py-8 text-[0.7rem] tracking-[0.04em] text-[var(--muted)]">
      <div className="font-serif font-semibold tracking-[0.1em]">Whisper-Up</div>
      <div>
        © {year} · Hanoi, Vietnam ·{' '}
        <a href="#" className="text-[var(--muted)] hover:text-[var(--text)]">
          Terms
        </a>{' '}
        ·{' '}
        <a href="#" className="text-[var(--muted)] hover:text-[var(--text)]">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
