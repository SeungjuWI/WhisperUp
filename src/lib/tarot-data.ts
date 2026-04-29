import type { TarotCard, Topic } from '@/types';

export const CARDS: readonly TarotCard[] = [
  { name: 'The Tower', symbol: '⚡', meaning: 'A sudden shift is needed' },
  { name: 'The Wheel', symbol: '☸️', meaning: 'A turning point is here' },
  { name: 'The Star', symbol: '⭐', meaning: 'New hope is waiting ahead' },
  { name: 'The World', symbol: '🌍', meaning: 'Completion and a new beginning' },
  { name: 'The Fool', symbol: '🌟', meaning: 'Move forward without fear' },
  { name: 'The Hermit', symbol: '🕯️', meaning: 'The answer is already within you' },
  { name: 'The Sun', symbol: '☀️', meaning: 'A bright outcome awaits' },
  { name: 'The Moon', symbol: '🌙', meaning: 'Uncertain, but keep moving' },
  { name: 'The Emperor', symbol: '👑', meaning: 'A time for steady growth' },
  { name: 'The Chariot', symbol: '⚔️', meaning: 'Your will can break through' },
  { name: 'Strength', symbol: '🦁', meaning: 'Trust your inner strength' },
  { name: 'The High Priestess', symbol: '🌀', meaning: 'Follow your intuition' },
] as const;

// Reading copy contains <em>/<strong> emphasis tags from the prototype.
// These are author-controlled, never user input — safe to render via
// dangerouslySetInnerHTML in TarotResult. Task 9 will move these to messages/.
export const READINGS: Record<Topic, readonly string[]> = {
  timing: [
    'The cards say <em>the time for change is approaching.</em> If hesitation is coming from fear, the cards show that fear is already outdated. <strong>Not moving now means missing this current.</strong>',
    "All three cards point to a <em>turning point.</em> This is not the time to wait. You already know the answer inside — you just need the confidence. <strong>The cards say you're ready.</strong>",
    "There's strong energy wanting change here. But the direction isn't fully clear yet. <em>Rather than right now, starting concrete preparations within 3 months</em> feels right.",
  ],
  potential: [
    "<em>A better environment is waiting for you.</em> The cards say your current position is not your ceiling. Staying where you are may actually be blocking your growth. <strong>Switching jobs isn't a risk — it's the natural next step.</strong>",
    "All three cards point to <em>the potential for growth.</em> The things you're worried about — can I do it, is it the right place — the cards seem to have already let go of those answers. <strong>The potential is definitely there.</strong>",
    "The cards say you're being undervalued. <em>The market is ready to assess your capabilities more highly.</em> Moving on isn't a gamble — it's a fair reassessment.",
  ],
  direction: [
    '<em>A different environment</em> could make you shine more. The direction the cards point to values growth over scale, autonomy over stability. <strong>A foreign-invested company or a fast-growing organization fits your energy.</strong>',
    'All three cards together show <em>leadership potential.</em> Moving to a place where you can play a bigger role is right. Look for a position with <strong>more authority and influence</strong> rather than just a higher title.',
    "The cards point toward <em>deepening your expertise.</em> Right now you need one deep specialization more than broad experience. <strong>Find the environment where that expertise can best be expressed</strong> — that's your next step.",
  ],
} as const;

export const TOPIC_LABELS: Record<Topic, string> = {
  timing: 'Your Career Timing',
  potential: 'Your Career Potential',
  direction: 'Your Career Direction',
};

export const CARD_POSITIONS: readonly [string, string, string] = [
  'Present',
  'Core Energy',
  'Outcome',
];

export const MAX_CARDS = 3;
