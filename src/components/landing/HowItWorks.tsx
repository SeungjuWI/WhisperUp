type Step = {
  num: string;
  symbol: string;
  title: string;
  desc: string;
};

const STEPS: Step[] = [
  {
    num: 'STEP 01',
    symbol: '🃏',
    title: 'Free Tarot',
    desc: 'Pick a topic, draw 3 cards. Get your direction and intuition first. Completely free.',
  },
  {
    num: 'STEP 02',
    symbol: '📊',
    title: 'Data Confidence',
    desc: "After your reading — if you want the real number, it's 29,000 VND. See exactly how much your salary could jump.",
  },
  {
    num: 'STEP 03',
    symbol: '🏢',
    title: 'Job Matches',
    desc: 'Want to know which companies fit you best? Add more info and get personalized job recommendations.',
  },
];

export default function HowItWorks() {
  return (
    <section className="relative z-[2] mx-auto max-w-[900px] px-6 py-20">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {STEPS.map((step) => (
          <article
            key={step.num}
            className="border border-[rgba(201,168,76,0.15)] bg-[rgba(14,12,24,0.04)] p-6 text-center transition-colors duration-200 hover:border-[rgba(201,168,76,0.35)]"
          >
            <div className="mb-3 font-serif text-[0.65rem] tracking-[0.2em] text-[rgba(201,168,76,0.5)]">
              {step.num}
            </div>
            <div className="mb-2 text-[1.6rem]" aria-hidden>
              {step.symbol}
            </div>
            <h3 className="mb-1 font-serif text-[0.88rem] font-semibold tracking-[0.04em] text-ink">
              {step.title}
            </h3>
            <p className="text-[0.78rem] leading-[1.7] text-[var(--muted)]">{step.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
