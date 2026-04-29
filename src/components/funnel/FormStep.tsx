'use client';

export type FormOption<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  question: string;
  subtitle: string;
  options: ReadonlyArray<FormOption<T>>;
  selected: T | null;
  onSelect: (value: T) => void;
  onNext: () => void;
  nextLabel: string;
};

export default function FormStep<T extends string>({
  question,
  subtitle,
  options,
  selected,
  onSelect,
  onNext,
  nextLabel,
}: Props<T>) {
  const canAdvance = selected !== null;

  return (
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <h3 className="mb-1 text-center font-serif text-[1rem] font-semibold tracking-[0.04em] text-paper">
        {question}
      </h3>
      <p className="mb-6 text-center text-[0.75rem] text-[rgba(245,240,232,0.4)]">{subtitle}</p>

      <div
        role="radiogroup"
        aria-label={question}
        className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2"
      >
        {options.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(opt.value)}
              className={`border px-4 py-3 text-center text-[0.82rem] transition-all duration-150 ${
                isSelected
                  ? 'border-gold bg-[rgba(201,168,76,0.1)] text-gold'
                  : 'border-[rgba(201,168,76,0.15)] bg-[rgba(245,240,232,0.04)] text-[rgba(245,240,232,0.7)] hover:border-[rgba(201,168,76,0.4)] hover:text-paper'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={!canAdvance}
        onClick={onNext}
        className={`w-full border bg-ink px-8 py-3 font-serif text-[0.82rem] font-semibold tracking-[0.1em] text-gold2 transition-all duration-200 ${
          canAdvance
            ? 'cursor-pointer border-[rgba(201,168,76,0.4)] hover:border-gold hover:bg-[rgba(201,168,76,0.1)]'
            : 'cursor-not-allowed border-[rgba(201,168,76,0.2)] opacity-40'
        }`}
      >
        {nextLabel}
      </button>
    </div>
  );
}
