'use client';

import { useState } from 'react';
import { useFunnelStore } from '@/store/funnel-store';

const SUBMIT_DELAY_MS = 1200;

export default function LeadCapture() {
  const [name, setName] = useState('');
  const [education, setEducation] = useState('');
  const [targetSalary, setTargetSalary] = useState('');

  const setStep = useFunnelStore((s) => s.setStep);
  const markLeadSubmitted = useFunnelStore((s) => s.markLeadSubmitted);
  const showLoading = useFunnelStore((s) => s.showLoading);
  const hideLoading = useFunnelStore((s) => s.hideLoading);

  const handleSubmit = () => {
    // Task 10 will POST { name, education, targetSalary, resultId } to /api/lead here.
    showLoading('Registering...');
    window.setTimeout(() => {
      markLeadSubmitted();
      setStep(5);
      hideLoading();
    }, SUBMIT_DELAY_MS);
  };

  const handleSkip = () => setStep(5);

  return (
    <div className="relative mb-4 border border-[rgba(201,168,76,0.15)] border-t-2 border-t-gold bg-[rgba(245,240,232,0.03)] p-6">
      <div className="mb-2 font-serif text-[0.65rem] tracking-[0.2em] text-gold">
        ✦ One More Step ✦
      </div>
      <h3 className="mb-1 font-serif text-[1rem] font-semibold leading-[1.4] tracking-[0.04em] text-paper">
        We can also tell you
        <br />
        which companies to target
      </h3>
      <p className="mb-5 text-[0.77rem] leading-[1.65] text-[rgba(245,240,232,0.45)]">
        Want personalized job recommendations on top of your result?
        <br />
        Add your details. Used only for matching — nothing else.
      </p>

      <div className="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-[rgba(201,168,76,0.2)] bg-[rgba(245,240,232,0.05)] px-4 py-3 text-[0.85rem] text-paper outline-none transition-colors placeholder:text-[rgba(245,240,232,0.25)] focus:border-gold"
        />
        <input
          type="text"
          placeholder="Education (e.g. Bachelor's)"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          className="w-full border border-[rgba(201,168,76,0.2)] bg-[rgba(245,240,232,0.05)] px-4 py-3 text-[0.85rem] text-paper outline-none transition-colors placeholder:text-[rgba(245,240,232,0.25)] focus:border-gold"
        />
      </div>
      <input
        type="text"
        placeholder="Target salary (e.g. 30M+ VND)"
        value={targetSalary}
        onChange={(e) => setTargetSalary(e.target.value)}
        className="mb-3 w-full border border-[rgba(201,168,76,0.2)] bg-[rgba(245,240,232,0.05)] px-4 py-3 text-[0.85rem] text-paper outline-none transition-colors placeholder:text-[rgba(245,240,232,0.25)] focus:border-gold"
      />

      <button
        type="button"
        onClick={handleSubmit}
        className="mb-2 w-full cursor-pointer border-0 bg-teal px-4 py-3.5 font-serif text-[0.82rem] font-semibold tracking-[0.1em] text-paper transition-all duration-200 hover:-translate-y-px hover:bg-[#26a99a]"
      >
        Get Job Recommendations →
      </button>
      <button
        type="button"
        onClick={handleSkip}
        className="w-full cursor-pointer border-0 bg-transparent px-2 py-2 text-[0.72rem] tracking-[0.06em] text-[rgba(245,240,232,0.3)] hover:text-[rgba(245,240,232,0.5)]"
      >
        Maybe later
      </button>

      <div className="mt-2 text-center text-[0.68rem] leading-[1.6] text-[rgba(245,240,232,0.3)]">
        Your info is used only for job matching · Never shared externally
      </div>
    </div>
  );
}
