'use client';

import { useTranslations } from 'next-intl';
import { useFunnelStore } from '@/store/funnel-store';
import type { Topic } from '@/types';

const TOPIC_IDS: ReadonlyArray<{ id: Topic; icon: string }> = [
  { id: 'timing', icon: '🌙' },
  { id: 'potential', icon: '⭐' },
  { id: 'direction', icon: '🔮' },
];

export default function TopicSelect() {
  const t = useTranslations('tarot.topic');
  const topic = useFunnelStore((s) => s.topic);
  const setTopic = useFunnelStore((s) => s.setTopic);
  const setStep = useFunnelStore((s) => s.setStep);
  const canAdvance = topic !== null;

  return (
    <section style={{ animation: 'fadeUp 0.5s ease both' }}>
      <div className="mb-2 text-center font-serif text-[0.7rem] tracking-[0.2em] text-[rgba(201,168,76,0.7)]">
        {t('label')}
      </div>
      <h2 className="mb-8 text-center font-serif text-[1.3rem] font-semibold leading-[1.4] tracking-[0.04em] text-paper">
        {t('question')}
      </h2>

      <div
        role="radiogroup"
        aria-label={t('ariaGroup')}
        className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3"
      >
        {TOPIC_IDS.map(({ id, icon }) => {
          const selected = topic === id;
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setTopic(id)}
              className={`border px-3 py-3.5 text-center transition-all duration-200 ${
                selected
                  ? 'border-gold bg-[rgba(201,168,76,0.12)]'
                  : 'border-[rgba(201,168,76,0.2)] bg-[rgba(245,240,232,0.04)] hover:border-[rgba(201,168,76,0.5)] hover:bg-[rgba(201,168,76,0.08)]'
              }`}
            >
              <span className="mb-1.5 block text-[1.4rem]" aria-hidden>
                {icon}
              </span>
              <span className="block whitespace-pre-line text-[0.78rem] font-light leading-[1.4] text-paper">
                {t(`options.${id}`)}
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
        {t('cta')}
      </button>
    </section>
  );
}
