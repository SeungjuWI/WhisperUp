// Deterministic weekly user counter for SocialProofBar.
//
// Anchored to the start of the current ISO week (Monday 00:00 UTC). Every
// 5-minute bucket since the anchor adds 1-3 to the displayed count, where
// the per-bucket increment is hash-seeded by the bucket index — so two
// visitors at the same wall-clock time see the same number (no flicker
// between users), but the count grows naturally over the week.
//
// Phase 2: replace with a real Supabase / PostHog cohort once Task 10 lands.

const WEEKLY_BASE = 800;
const BUCKET_MS = 3 * 60 * 1000;

function getWeekStartUTC(now: Date): number {
  const day = now.getUTCDay(); // 0=Sun .. 6=Sat
  const daysSinceMonday = (day + 6) % 7; // Mon=0, Sun=6
  return Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - daysSinceMonday,
    0,
    0,
    0,
    0,
  );
}

// Knuth multiplicative hash → 1, 2, or 3 (uniform-ish).
function bucketIncrement(i: number): number {
  let h = Math.imul(i + 1, 2654435761);
  h ^= h >>> 16;
  return 1 + ((h >>> 0) % 3);
}

export function computeWeeklyCount(now: Date = new Date()): number {
  const elapsed = Math.max(0, now.getTime() - getWeekStartUTC(now));
  const buckets = Math.floor(elapsed / BUCKET_MS);
  let total = WEEKLY_BASE;
  for (let i = 0; i <= buckets; i++) {
    total += bucketIncrement(i);
  }
  return total;
}
