'use client';

// Last-resort root error boundary that runs when even the layout fails to
// render. Must include its own <html>/<body> tags. Kept minimal so it can
// never throw itself.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          background: '#f5f0e8',
          color: '#2a2440',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          textAlign: 'center',
        }}
      >
        <div style={{ color: '#c9a84c', fontSize: 12, letterSpacing: '0.3em', marginBottom: 12 }}>
          ✦ FATAL ✦
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>
          Whisper-Up crashed unexpectedly
        </h1>
        {error.digest ? (
          <p style={{ fontSize: 12, color: '#7a7090', marginBottom: 16 }}>
            Reference: {error.digest}
          </p>
        ) : null}
        <button
          type="button"
          onClick={reset}
          style={{
            border: '1px solid #c9a84c',
            background: '#0e0c18',
            color: '#e8c96a',
            padding: '12px 32px',
            fontSize: 13,
            letterSpacing: '0.1em',
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
