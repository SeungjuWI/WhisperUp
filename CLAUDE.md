# CLAUDE.md — WhisperUp 개발 가이드

## 프로젝트 개요

WhisperUp은 베트남 이직 고민 직장인을 위한 "이직 확신 서비스"다.
타로처럼 가볍게 진입 → 데이터로 연봉 상승률 확인 → 이직 회사 추천까지 이어지는 3단계 퍼널 구조.

- **표면**: 커리어 타로 + 데이터 확신 (B2C 29,000 VND)
- **본질**: 이직 의향 확인된 고품질 인재 풀 구축 → B2B 수익화

## 기술 스택

```
프레임워크:   Next.js 14 (App Router)
언어:         TypeScript
스타일링:     Tailwind CSS + CSS Variables (기존 디자인 시스템 유지)
상태관리:     Zustand (퍼널 상태 관리)
DB:           Supabase (PostgreSQL + Auth + Realtime)
결제:         VNPay 또는 MoMo API (베트남 로컬 결제)
배포:         Vercel
분석:         Mixpanel 또는 PostHog (퍼널 전환율 추적 필수)
i18n:         next-intl (vi / en 2개 언어)
```

## 디자인 시스템

기존 프로토타입 HTML의 디자인 토큰을 그대로 계승한다. 절대 바꾸지 않는 것들:

```css
--ink:    #0e0c18    /* 다크 배경 */
--paper:  #f5f0e8    /* 라이트 배경 (종이 질감) */
--gold:   #c9a84c    /* 주 액센트 — 타로/신비 느낌 */
--gold2:  #e8c96a    /* 보조 골드 */
--mystic: #7c5cbf    /* 보라 — 타로 분위기 */
--teal:   #2a9d8f    /* CTA 포인트 — 데이터/신뢰 */
--serif:  'Cinzel', serif    /* 헤딩·타로 카드 */
--sans:   'DM Sans', sans-serif  /* 본문 */
```

핵심 디자인 원칙:
- **타로 앱 영역**은 항상 다크(`--ink`) 배경
- **랜딩 영역**은 항상 라이트(`--paper`) 배경 + 종이 질감
- 골드 보더, 코너 장식, ✦ 심볼은 브랜드 정체성 — 유지
- 카드 뒤집기 애니메이션(perspective 3D flip)은 핵심 인터랙션

## 디렉토리 구조

```
whisper-up/
├── CLAUDE.md
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              # 랜딩 (Hero + How it works)
│   │   │   └── reading/
│   │   │       └── page.tsx          # 타로 + 퍼널 전체 플로우
│   │   ├── api/
│   │   │   ├── calculate/route.ts    # 연봉 상승률 계산 (서버)
│   │   │   ├── payment/route.ts      # 결제 처리
│   │   │   └── lead/route.ts         # 리드 수집
│   │   └── globals.css
│   ├── components/
│   │   ├── landing/
│   │   │   ├── Nav.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   └── Footer.tsx
│   │   ├── tarot/
│   │   │   ├── TopicSelect.tsx       # Step 0: 주제 선택
│   │   │   ├── CardDeck.tsx          # Step 1: 카드 3장 뽑기
│   │   │   ├── TarotCard.tsx         # 개별 카드 (flip 애니메이션)
│   │   │   ├── TarotResult.tsx       # Step 2: 타로 리딩 결과
│   │   │   └── Upsell.tsx            # 유료 전환 CTA
│   │   ├── funnel/
│   │   │   ├── InputFlow.tsx         # Step 3: 직군→연차→도시→연봉
│   │   │   ├── FormStep.tsx          # 개별 입력 스텝
│   │   │   ├── DataResult.tsx        # Step 4: +28% 결과 화면
│   │   │   ├── LeadCapture.tsx       # Step 4 하단: 개인정보 수집
│   │   │   └── Complete.tsx          # Step 5: 완료 + 공유
│   │   ├── ui/
│   │   │   ├── LoadingOverlay.tsx    # ✦ 로딩 스피너
│   │   │   ├── OrnamentDivider.tsx   # ✦ 구분선
│   │   │   └── ProgressDots.tsx      # 폼 진행 인디케이터
│   │   └── analytics/
│   │       └── FunnelTracker.tsx     # 퍼널 이벤트 추적
│   ├── store/
│   │   └── funnel-store.ts          # Zustand: 퍼널 전체 상태
│   ├── lib/
│   │   ├── salary-calculator.ts     # 연봉 상승률 계산 로직
│   │   ├── tarot-data.ts            # 카드 데이터 + 리딩 텍스트
│   │   ├── supabase.ts              # DB 클라이언트
│   │   └── analytics.ts             # 이벤트 트래킹 유틸
│   ├── messages/
│   │   ├── vi.json                  # 베트남어 (기본)
│   │   └── en.json                  # 영어
│   └── types/
│       └── index.ts
├── supabase/
│   └── migrations/
│       └── 001_initial.sql          # users, readings, leads 테이블
├── public/
│   └── fonts/
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

## 퍼널 상태 관리 (Zustand Store)

```typescript
// 이것이 퍼널의 핵심 상태다. 모든 컴포넌트가 이 스토어를 참조한다.
interface FunnelState {
  // Step 0: 주제 선택
  topic: 'timing' | 'potential' | 'direction' | null;
  
  // Step 1: 카드 선택
  selectedCards: TarotCard[];  // max 3
  
  // Step 2: 타로 결과 (자동 생성)
  reading: string | null;
  
  // Step 3: 유료 입력 (결제 후)
  isPaid: boolean;
  field: string | null;      // 직군
  years: string | null;      // 연차
  city: string | null;       // 도시
  salary: number | null;     // 현재 연봉 범위
  
  // Step 4: 결과
  resultPct: number | null;  // 계산된 상승률
  
  // Step 4 하단: 리드
  leadSubmitted: boolean;
  
  // 현재 스텝
  currentStep: 0 | 1 | 2 | 3 | 4 | 5;
}
```

## DB 스키마 (Supabase)

```sql
-- 타로 리딩 기록 (무료 단계에서도 저장 — 익명)
CREATE TABLE readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,          -- 브라우저 세션 (쿠키)
  topic TEXT NOT NULL,               -- timing/potential/direction
  cards JSONB NOT NULL,              -- 선택한 3장
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 유료 결과 (결제 완료 후)
CREATE TABLE results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reading_id UUID REFERENCES readings(id),
  field TEXT NOT NULL,
  years TEXT NOT NULL,
  city TEXT NOT NULL,
  salary_range INT NOT NULL,
  result_pct INT NOT NULL,
  payment_id TEXT,                   -- VNPay/MoMo 트랜잭션 ID
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 리드 (자발적 개인정보 — B2B 인재풀)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  result_id UUID REFERENCES results(id),
  name TEXT,
  education TEXT,
  target_salary TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 핵심 비즈니스 로직 — 연봉 상승률 계산

```typescript
// lib/salary-calculator.ts
// 프로토타입과 동일한 로직. 추후 실제 데이터 기반으로 교체.
const PCT_TABLE = {
  'Engineering':  { base: 26, adj: { 1: 22, 3: 26, 5: 28, 8: 24, 12: 20 } },
  'Marketing':    { base: 23, adj: { 1: 18, 3: 22, 5: 25, 8: 22, 12: 18 } },
  'Sales & BD':   { base: 25, adj: { 1: 20, 3: 24, 5: 28, 8: 25, 12: 22 } },
  'Design & UX':  { base: 22, adj: { 1: 18, 3: 21, 5: 24, 8: 20, 12: 17 } },
  'Finance':      { base: 20, adj: { 1: 16, 3: 19, 5: 22, 8: 20, 12: 17 } },
  'HR & Ops':     { base: 19, adj: { 1: 15, 3: 18, 5: 21, 8: 19, 12: 16 } },
};
// HCMC +2%, 저연봉(<15M) +3%, 고연봉(>30M) -2%
```

## PMF 추적 이벤트 (필수)

퍼널 전환율이 PMF 판단 기준이다. 다음 이벤트는 반드시 추적한다:

| 이벤트 | 트리거 시점 | PMF 기준 |
|--------|------------|----------|
| `tarot_started` | Step 0: 주제 선택 | - |
| `tarot_completed` | Step 1: 카드 3장 뽑기 완료 | 완료율 40%+ |
| `tarot_result_viewed` | Step 2: 타로 결과 확인 | - |
| `upsell_clicked` | Step 2: "데이터로 확인" 클릭 | - |
| `payment_completed` | Step 3: 결제 완료 | 타로→유료 전환율 5%+ |
| `data_result_viewed` | Step 4: 결과 화면 확인 | - |
| `lead_submitted` | Step 4: 개인정보 제출 | 유료→리드 전환율 30%+ |
| `result_shared` | Step 5: 결과 공유 | - |

## 코딩 컨벤션

- 컴포넌트는 모두 함수형 + TypeScript
- 서버 컴포넌트 기본, 인터랙션 필요 시 `'use client'`
- 타로 앱 영역(Step 0~5)은 전부 클라이언트 컴포넌트
- 연봉 계산 API는 서버 라우트 (클라이언트에서 로직 노출 방지)
- 커밋 메시지: `feat:`, `fix:`, `style:`, `refactor:` 접두사
- 모바일 퍼스트 — 베트남 사용자 대부분 모바일

## 절대 하지 말 것

- 타로 영역에서 밝은 배경 사용 금지 (항상 `--ink`)
- 타로 카드 데이터를 하드코딩하지 말 것 — `tarot-data.ts`에서 import
- 연봉 계산 로직을 클라이언트에 노출하지 말 것
- PMF 이벤트 트래킹 빠뜨리지 말 것
- 결제 없이 Step 3→4 넘어가는 것 허용 금지
- 한국어로 UI 텍스트 쓰지 말 것 (vi/en만)

## Phase 로드맵

### Phase 1: PMF 테스트 (현재 — 2주)
MVP 구현. 프로토타입 HTML과 동일한 기능을 Next.js로 옮기기.
결제는 모킹 (실제 결제 연동 전 퍼널 전환율 먼저 검증).
Supabase에 데이터 저장 시작.

### Phase 2: 결제 + 분석 (2주)
VNPay/MoMo 실결제 연동.
Mixpanel/PostHog 연동 + 대시보드 구축.
A/B 테스트 인프라 (타로 리딩 텍스트, 업셀 카피).

### Phase 3: B2B 파이프라인 (이후)
관리자 대시보드 (리드 목록, 전환율 대시보드).
B2C 프리미엄 (99,000 VND/월 상세 분석).
HR 인사이트 리포트 자동화.
