'use client';

import { useEffect } from 'react';
import { useFunnelStore } from '@/store/funnel-store';

/**
 * Reset funnel state when the landing page mounts. Navigating back here from
 * any later step is treated as "give up / restart" — the next /reading visit
 * begins from Step 0 with no stale topic/cards/result.
 */
export default function FunnelReset() {
  const reset = useFunnelStore((s) => s.reset);
  useEffect(() => {
    reset();
  }, [reset]);
  return null;
}
