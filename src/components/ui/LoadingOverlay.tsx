'use client';

type Props = {
  active: boolean;
  text: string;
};

export default function LoadingOverlay({ active, text }: Props) {
  if (!active) return null;
  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[rgba(14,12,24,0.95)]"
      role="status"
      aria-live="polite"
    >
      <div
        aria-hidden
        className="font-serif text-[1.8rem] text-gold"
        style={{ animation: 'spin 3s linear infinite' }}
      >
        ✦
      </div>
      <div className="text-[0.75rem] tracking-[0.1em] text-[rgba(245,240,232,0.4)]">
        {text}
      </div>
    </div>
  );
}
