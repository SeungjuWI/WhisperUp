'use client';

import { useFunnelStore } from '@/store/funnel-store';
import type { Topic } from '@/types';

const TOPICS: ReadonlyArray<{ id: Topic; icon: string; text: string }> = [
  { id: 'timing', icon: '🌙', text: 'Is now the right time\nto switch jobs?' },
  { id: 'potential', icon: '⭐', text: 'Will things actually\nget better if I switch?' },
  { id: 'direction', icon: '🔮', text: 'Which direction\nshould I go?' },
];

export default function TopicSelect() {
  const topic = useFunnelStore((s) => s.topic);
  const setTopic = useFunnelStore((s) => s.setTopic);
  const setStep = useFunnelStore((s) => s.setStep);
  const canAdvance = topic !== null;

  return (
    <section style={{ animation: 'fadeUp 0.5s ease both' }}>
      <div className="mb-2 text-center font-serif text-[0.7rem] tracking-[0.2em] text-[rgba(201,168,76,0.7)]">
        ✦ CAREER TAROT ✦
      </div>
      <h2 className="mb-8 text-center font-serif text-[1.3rem] font-semibold leading-[1.4] tracking-[0.04em] text-paper">
        What&apos;s on your mind right now?
      </h2>

      <div
        role="radiogroup"
        aria-label="Choose your reading topic"
        className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3"
      >
        {TOPICS.map((t) => {
          const selected = topic === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setTopic(t.id)}
              className={`border px-3 py-3.5 text-center transition-all duration-200 ${
                selected
                  ? 'border-gold bg-[rgba(201,168,76,0.12)]'
                  : 'border-[rgba(201,168,76,0.2)] bg-[rgba(245,240,232,0.04)] hover:border-[rgba(201,168,76,0.5)] hover:bg-[rgba(201,168,76,0.08)]'
              }`}
            >
              <span className="mb-1.5 block text-[1.4rem]" aria-hidden>
                {t.icon}
              </span>
              <span className="block whitespace-pre-line text-[0.78rem] font-light leading-[1.4] text-paper">
                {t.text}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={!canAdvance}
        onClick={() => setStep(1)}
        className={`w-full border bg-ink px-8 py-3 font-serif text-[0.82rem] font-semibold tracking-[0.1em] text-gold2 transition-all duration-200 ${
          canAdvance
            ? 'cursor-pointer border-[rgba(201,168,76,0.4)] hover:border-gold hover:bg-[rgba(201,168,76,0.1)]'
            : 'cursor-not-allowed border-[rgba(201,168,76,0.2)] opacity-40'
        }`}
      >
        Choose Your Cards →
      </button>
    </section>
  );
}
