'use client';

/**
 * SVG tarot card illustrations — gold line-art on dark background.
 * Each card gets a unique symbolic drawing that fits the small card face.
 * viewBox is 60x80 to keep proportions tight inside the 68x112 card.
 */

const stroke = 'rgba(201,168,76,0.85)';
const fill = 'none';
const sw = '1.2'; // strokeWidth

const arts: Record<string, React.ReactNode> = {
  /* The Tower — lightning striking a tower */
  tower: (
    <>
      <polygon points="22,70 38,70 35,30 25,30" stroke={stroke} fill="none" strokeWidth={sw} />
      <rect x="27" y="24" width="6" height="8" stroke={stroke} fill="none" strokeWidth="0.8" />
      <polyline points="18,18 30,8 42,18" stroke={stroke} fill="none" strokeWidth={sw} />
      <polyline points="45,12 38,28 42,28 34,44" stroke="rgba(232,201,106,0.9)" fill="none" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="50" r="1.2" fill={stroke} />
      <circle cx="42" cy="56" r="1.2" fill={stroke} />
    </>
  ),

  /* Wheel of Fortune — a wheel with spokes */
  wheel: (
    <>
      <circle cx="30" cy="40" r="18" stroke={stroke} fill="none" strokeWidth={sw} />
      <circle cx="30" cy="40" r="6" stroke={stroke} fill="none" strokeWidth="0.8" />
      {[0, 45, 90, 135].map((a) => {
        const r1 = 6, r2 = 18;
        const rad = (a * Math.PI) / 180;
        return (
          <line key={a}
            x1={30 + r1 * Math.cos(rad)} y1={40 + r1 * Math.sin(rad)}
            x2={30 + r2 * Math.cos(rad)} y2={40 + r2 * Math.sin(rad)}
            stroke={stroke} strokeWidth="0.8"
          />
        );
      })}
      <circle cx="30" cy="40" r="12" stroke={stroke} fill="none" strokeWidth="0.5" strokeDasharray="2 2" />
    </>
  ),

  /* The Star — large star with radiating lines */
  star: (
    <>
      <polygon
        points="30,14 33,26 45,26 35,33 39,45 30,37 21,45 25,33 15,26 27,26"
        stroke={stroke} fill="rgba(201,168,76,0.1)" strokeWidth={sw} strokeLinejoin="round"
      />
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const rad = ((a - 90) * Math.PI) / 180;
        return (
          <line key={a}
            x1={30 + 22 * Math.cos(rad)} y1={32 + 22 * Math.sin(rad)}
            x2={30 + 26 * Math.cos(rad)} y2={32 + 26 * Math.sin(rad)}
            stroke={stroke} strokeWidth="0.6" strokeLinecap="round"
          />
        );
      })}
      <path d="M18,62 Q24,56 30,62 Q36,56 42,62" stroke={stroke} fill="none" strokeWidth="0.8" />
    </>
  ),

  /* The World — globe with laurel wreath */
  world: (
    <>
      <ellipse cx="30" cy="40" rx="16" ry="18" stroke={stroke} fill="none" strokeWidth={sw} />
      <ellipse cx="30" cy="40" rx="7" ry="18" stroke={stroke} fill="none" strokeWidth="0.6" />
      <line x1="14" y1="40" x2="46" y2="40" stroke={stroke} strokeWidth="0.6" />
      <path d="M14,32 Q30,28 46,32" stroke={stroke} fill="none" strokeWidth="0.5" />
      <path d="M14,48 Q30,52 46,48" stroke={stroke} fill="none" strokeWidth="0.5" />
      <path d="M10,18 Q16,24 14,32" stroke={stroke} fill="none" strokeWidth="0.8" />
      <path d="M50,18 Q44,24 46,32" stroke={stroke} fill="none" strokeWidth="0.8" />
      <path d="M10,62 Q16,56 14,48" stroke={stroke} fill="none" strokeWidth="0.8" />
      <path d="M50,62 Q44,56 46,48" stroke={stroke} fill="none" strokeWidth="0.8" />
    </>
  ),

  /* The Fool — figure stepping off cliff with bundle */
  fool: (
    <>
      <circle cx="30" cy="18" r="5" stroke={stroke} fill="none" strokeWidth={sw} />
      <line x1="30" y1="23" x2="30" y2="44" stroke={stroke} strokeWidth={sw} />
      <line x1="30" y1="30" x2="20" y2="38" stroke={stroke} strokeWidth={sw} />
      <line x1="30" y1="30" x2="42" y2="26" stroke={stroke} strokeWidth={sw} />
      <circle cx="44" cy="23" r="3" stroke={stroke} fill="rgba(201,168,76,0.15)" strokeWidth="0.8" />
      <line x1="30" y1="44" x2="22" y2="58" stroke={stroke} strokeWidth={sw} />
      <line x1="30" y1="44" x2="38" y2="56" stroke={stroke} strokeWidth={sw} />
      <path d="M12,58 L22,58 L22,68" stroke={stroke} fill="none" strokeWidth="0.8" />
      <circle cx="14" cy="54" r="1" fill={stroke} />
    </>
  ),

  /* The Hermit — cloaked figure with lantern */
  hermit: (
    <>
      <path d="M24,20 L30,10 L36,20" stroke={stroke} fill="none" strokeWidth={sw} />
      <path d="M22,20 L22,55 Q30,62 38,55 L38,20" stroke={stroke} fill="none" strokeWidth={sw} />
      <line x1="38" y1="30" x2="46" y2="22" stroke={stroke} strokeWidth={sw} />
      <polygon points="44,16 48,16 48,22 44,22" stroke={stroke} fill="rgba(232,201,106,0.2)" strokeWidth="0.8" />
      <circle cx="46" cy="14" r="3" stroke="rgba(232,201,106,0.6)" fill="rgba(232,201,106,0.1)" strokeWidth="0.6" />
      <line x1="30" y1="55" x2="30" y2="68" stroke={stroke} strokeWidth="0.8" />
    </>
  ),

  /* The Sun — radiant sun face */
  sun: (
    <>
      <circle cx="30" cy="38" r="12" stroke={stroke} fill="rgba(201,168,76,0.08)" strokeWidth={sw} />
      <circle cx="26" cy="35" r="1.5" fill={stroke} />
      <circle cx="34" cy="35" r="1.5" fill={stroke} />
      <path d="M26,42 Q30,46 34,42" stroke={stroke} fill="none" strokeWidth="0.8" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => {
        const rad = (a * Math.PI) / 180;
        const inner = a % 60 === 0 ? 14 : 13;
        const outer = a % 60 === 0 ? 22 : 18;
        return (
          <line key={a}
            x1={30 + inner * Math.cos(rad)} y1={38 + inner * Math.sin(rad)}
            x2={30 + outer * Math.cos(rad)} y2={38 + outer * Math.sin(rad)}
            stroke={stroke} strokeWidth={a % 60 === 0 ? '1' : '0.6'} strokeLinecap="round"
          />
        );
      })}
    </>
  ),

  /* The Moon — crescent moon with drops */
  moon: (
    <>
      <circle cx="30" cy="28" r="14" stroke={stroke} fill="rgba(201,168,76,0.06)" strokeWidth={sw} />
      <circle cx="36" cy="24" r="10" stroke="var(--ink)" fill="var(--ink)" strokeWidth="0" />
      <path d="M14,56 Q22,48 30,56 Q38,48 46,56" stroke={stroke} fill="none" strokeWidth="0.8" />
      <path d="M14,62 Q22,54 30,62 Q38,54 46,62" stroke={stroke} fill="none" strokeWidth="0.6" opacity="0.5" />
      <circle cx="20" cy="46" r="1" fill={stroke} opacity="0.6" />
      <circle cx="40" cy="44" r="1" fill={stroke} opacity="0.6" />
      <circle cx="30" cy="50" r="0.8" fill={stroke} opacity="0.4" />
    </>
  ),

  /* The Emperor — throne/crown */
  emperor: (
    <>
      <polygon points="22,20 26,12 30,18 34,12 38,20" stroke={stroke} fill="rgba(201,168,76,0.15)" strokeWidth={sw} />
      <rect x="22" y="20" width="16" height="4" stroke={stroke} fill="none" strokeWidth="0.8" />
      <circle cx="30" cy="30" r="4" stroke={stroke} fill="none" strokeWidth={sw} />
      <line x1="30" y1="34" x2="30" y2="50" stroke={stroke} strokeWidth={sw} />
      <line x1="30" y1="38" x2="20" y2="44" stroke={stroke} strokeWidth={sw} />
      <line x1="30" y1="38" x2="40" y2="44" stroke={stroke} strokeWidth={sw} />
      <rect x="16" y="50" width="28" height="16" rx="2" stroke={stroke} fill="none" strokeWidth="0.8" />
      <line x1="16" y1="54" x2="44" y2="54" stroke={stroke} strokeWidth="0.5" />
    </>
  ),

  /* The Chariot — chariot with wheels */
  chariot: (
    <>
      <rect x="18" y="24" width="24" height="20" rx="2" stroke={stroke} fill="none" strokeWidth={sw} />
      <polygon points="22,24 30,14 38,24" stroke={stroke} fill="rgba(201,168,76,0.1)" strokeWidth={sw} />
      <circle cx="18" cy="52" r="6" stroke={stroke} fill="none" strokeWidth={sw} />
      <circle cx="42" cy="52" r="6" stroke={stroke} fill="none" strokeWidth={sw} />
      <line x1="18" y1="44" x2="18" y2="46" stroke={stroke} strokeWidth="0.8" />
      <line x1="42" y1="44" x2="42" y2="46" stroke={stroke} strokeWidth="0.8" />
      <circle cx="18" cy="52" r="1.5" fill={stroke} />
      <circle cx="42" cy="52" r="1.5" fill={stroke} />
      <line x1="30" y1="30" x2="30" y2="38" stroke={stroke} strokeWidth="0.8" />
    </>
  ),

  /* Strength — lion outline */
  strength: (
    <>
      <ellipse cx="30" cy="44" rx="14" ry="10" stroke={stroke} fill="none" strokeWidth={sw} />
      <circle cx="30" cy="30" r="8" stroke={stroke} fill="none" strokeWidth={sw} />
      <path d="M22,28 Q18,20 22,16" stroke={stroke} fill="none" strokeWidth="0.8" />
      <path d="M38,28 Q42,20 38,16" stroke={stroke} fill="none" strokeWidth="0.8" />
      <circle cx="27" cy="28" r="1.2" fill={stroke} />
      <circle cx="33" cy="28" r="1.2" fill={stroke} />
      <path d="M27,33 L30,35 L33,33" stroke={stroke} fill="none" strokeWidth="0.8" />
      <path d="M16,44 L12,56" stroke={stroke} strokeWidth="0.8" />
      <path d="M44,44 L48,56" stroke={stroke} strokeWidth="0.8" />
      <path d="M24,52 L22,64" stroke={stroke} strokeWidth="0.8" />
      <path d="M36,52 L38,64" stroke={stroke} strokeWidth="0.8" />
      <path d="M30,54 Q34,58 40,56" stroke={stroke} fill="none" strokeWidth="0.8" />
    </>
  ),

  /* High Priestess — seated figure with pillars */
  priestess: (
    <>
      <rect x="10" y="16" width="4" height="48" stroke={stroke} fill="none" strokeWidth="0.8" />
      <rect x="46" y="16" width="4" height="48" stroke={stroke} fill="none" strokeWidth="0.8" />
      <text x="12" y="28" fontSize="5" fill={stroke} textAnchor="middle" fontFamily="serif">B</text>
      <text x="48" y="28" fontSize="5" fill={stroke} textAnchor="middle" fontFamily="serif">J</text>
      <circle cx="30" cy="26" r="5" stroke={stroke} fill="none" strokeWidth={sw} />
      <path d="M24,18 L30,12 L36,18" stroke={stroke} fill="none" strokeWidth="0.8" />
      <path d="M25,31 L25,52 Q30,56 35,52 L35,31" stroke={stroke} fill="none" strokeWidth={sw} />
      <path d="M22,38 Q30,34 38,38" stroke={stroke} fill="none" strokeWidth="0.6" />
      <circle cx="30" cy="44" r="3" stroke={stroke} fill="rgba(201,168,76,0.1)" strokeWidth="0.6" />
    </>
  ),

  /* Justice — scales */
  justice: (
    <>
      <line x1="30" y1="12" x2="30" y2="56" stroke={stroke} strokeWidth={sw} />
      <line x1="14" y1="22" x2="46" y2="22" stroke={stroke} strokeWidth={sw} />
      <line x1="14" y1="22" x2="14" y2="32" stroke={stroke} strokeWidth="0.8" />
      <line x1="46" y1="22" x2="46" y2="36" stroke={stroke} strokeWidth="0.8" />
      <path d="M8,32 Q14,38 20,32" stroke={stroke} fill="rgba(201,168,76,0.1)" strokeWidth={sw} />
      <path d="M40,36 Q46,42 52,36" stroke={stroke} fill="rgba(201,168,76,0.1)" strokeWidth={sw} />
      <rect x="24" y="56" width="12" height="4" rx="1" stroke={stroke} fill="none" strokeWidth="0.8" />
      <polygon points="28,12 30,8 32,12" stroke={stroke} fill={stroke} strokeWidth="0.5" />
    </>
  ),

  /* The Magician — figure with infinity symbol and tools */
  magician: (
    <>
      <circle cx="30" cy="20" r="5" stroke={stroke} fill="none" strokeWidth={sw} />
      <path d="M24,12 Q30,8 36,12" stroke={stroke} fill="none" strokeWidth="0.8" />
      <line x1="30" y1="25" x2="30" y2="48" stroke={stroke} strokeWidth={sw} />
      <line x1="30" y1="32" x2="18" y2="28" stroke={stroke} strokeWidth={sw} />
      <line x1="30" y1="32" x2="42" y2="28" stroke={stroke} strokeWidth={sw} />
      <line x1="18" y1="28" x2="18" y2="22" stroke={stroke} strokeWidth="0.8" />
      <circle cx="42" cy="26" r="2" stroke={stroke} fill="none" strokeWidth="0.8" />
      <rect x="20" y="52" width="20" height="3" rx="1" stroke={stroke} fill="none" strokeWidth="0.8" />
      <circle cx="24" cy="58" r="1.5" stroke={stroke} fill="none" strokeWidth="0.6" />
      <polygon points="29,57 30,55 31,57" stroke={stroke} fill={stroke} strokeWidth="0.4" />
      <rect x="34" y="56" width="3" height="3" stroke={stroke} fill="none" strokeWidth="0.6" />
      <polygon points="39,58 40,56 41,58" stroke={stroke} fill="none" strokeWidth="0.6" />
    </>
  ),

  /* Temperance — angel with cups pouring water */
  temperance: (
    <>
      <circle cx="30" cy="18" r="5" stroke={stroke} fill="none" strokeWidth={sw} />
      <path d="M18,22 Q14,14 20,10" stroke={stroke} fill="none" strokeWidth="0.8" />
      <path d="M42,22 Q46,14 40,10" stroke={stroke} fill="none" strokeWidth="0.8" />
      <line x1="30" y1="23" x2="30" y2="44" stroke={stroke} strokeWidth={sw} />
      <path d="M30,30 L18,36 L18,44 L22,44" stroke={stroke} fill="none" strokeWidth={sw} />
      <path d="M30,30 L42,36 L42,44 L38,44" stroke={stroke} fill="none" strokeWidth={sw} />
      <path d="M22,44 Q30,38 38,44" stroke="rgba(232,201,106,0.6)" fill="none" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
      <line x1="30" y1="44" x2="24" y2="60" stroke={stroke} strokeWidth={sw} />
      <line x1="30" y1="44" x2="36" y2="60" stroke={stroke} strokeWidth={sw} />
    </>
  ),
};

export default function TarotCardArt({ cardId }: { cardId: string }) {
  const art = arts[cardId];
  if (!art) return null;

  return (
    <svg
      viewBox="0 0 60 80"
      width="48"
      height="64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none"
      aria-hidden
    >
      {art}
    </svg>
  );
}
