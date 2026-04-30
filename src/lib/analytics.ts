type EventName =
  | 'page_viewed'
  | 'cta_clicked'
  | 'topic_selected'
  | 'card_selected'
  | 'cards_completed'
  | 'paywall_viewed'
  | 'payment_clicked'
  | 'payment_completed'
  | 'paywall_declined'
  | 'result_viewed'
  | 'share_clicked';

type EventProps = Record<string, string | number | boolean | null>;

function getSessionId(): string {
  const key = 'wu_sid';
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

export function track(event: EventName, props?: EventProps) {
  const payload = {
    event,
    session_id: getSessionId(),
    timestamp: new Date().toISOString(),
    url: window.location.pathname,
    ...props,
  };

  // Always log in dev
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('[track]', event, props);
  }

  // Send to API route — fire-and-forget
  const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
  navigator.sendBeacon('/api/events', blob);
}
