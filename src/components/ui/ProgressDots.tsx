type Props = {
  total: number;
  /** 0-indexed current step */
  current: number;
};

export default function ProgressDots({ total, current }: Props) {
  return (
    <div
      className="mb-7 flex justify-center gap-1.5"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-label="Form progress"
    >
      {Array.from({ length: total }, (_, i) => {
        const state = i === current ? 'active' : i < current ? 'done' : 'pending';
        const cls =
          state === 'active'
            ? 'bg-gold shadow-[0_0_6px_rgba(201,168,76,0.5)]'
            : state === 'done'
              ? 'bg-[rgba(201,168,76,0.4)]'
              : 'bg-[rgba(245,240,232,0.15)]';
        return (
          <span
            key={i}
            aria-hidden
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${cls}`}
          />
        );
      })}
    </div>
  );
}
