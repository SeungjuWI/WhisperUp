# WhisperUp 개발 계획서 — Claude Code 작업 가이드

## 전제

- Claude Code에서 단계별로 작업 지시
- 각 Task는 하나의 Claude Code 세션에서 완결 가능한 단위
- Task 완료 후 반드시 로컬에서 확인 후 다음 진행
- CLAUDE.md를 프로젝트 루트에 두면 Claude Code가 매 세션마다 참조함

---

## 작업 순서 (Phase 1: PMF 테스트 MVP)

### Task 0: 프로젝트 초기화
```
Claude Code 프롬프트 예시:
"CLAUDE.md를 읽고 프로젝트를 초기화해줘.
Next.js 14 App Router + TypeScript + Tailwind 설정하고,
디렉토리 구조 만들고, 필요한 패키지 설치해줘.
next-intl 설정도 해줘 (vi가 기본, en 추가)."
```

산출물:
- package.json (의존성 전체)
- tailwind.config.ts (커스텀 컬러 + 폰트)
- globals.css (CSS Variables + 기본 스타일)
- app/[locale]/layout.tsx
- next-intl 설정 파일들
- messages/vi.json, messages/en.json (빈 틀)

확인 포인트:
- `npm run dev` 정상 동작
- localhost에서 빈 페이지 렌더링 확인

---

### Task 1: 랜딩 페이지 (정적 영역)
```
"CLAUDE.md를 읽고 랜딩 페이지를 만들어줘.
기존 HTML 프로토타입(WhisperUp_funnel_EN__5_.html)의
Nav, Hero, How It Works, Footer 영역을 Next.js 컴포넌트로 변환해줘.
디자인 토큰(색상, 폰트, 골드 보더)은 정확히 유지.
모바일 반응형 필수. Hero의 별(stars) 애니메이션도 포함."
```

산출물:
- components/landing/Nav.tsx
- components/landing/Hero.tsx
- components/landing/HowItWorks.tsx
- components/landing/Footer.tsx
- components/ui/OrnamentDivider.tsx
- app/[locale]/page.tsx

확인 포인트:
- 프로토타입 HTML과 시각적으로 동일한지 비교
- 모바일(375px) 레이아웃 정상
- "Start Free Now" 버튼 → 타로 앱 섹션으로 스크롤

---

### Task 2: 타로 데이터 + Zustand Store
```
"CLAUDE.md를 읽고 타로 데이터 파일과 Zustand 스토어를 만들어줘.
lib/tarot-data.ts에 카드 12장 데이터, 주제별 리딩 텍스트 넣고,
store/funnel-store.ts에 퍼널 상태 관리 스토어 만들어줘.
타입 정의도 types/index.ts에."
```

산출물:
- lib/tarot-data.ts (CARDS, READINGS 데이터)
- store/funnel-store.ts (Zustand)
- types/index.ts

확인 포인트:
- 타입 에러 없음
- 스토어 액션 동작 확인 (devtools)

---

### Task 3: Step 0 — 주제 선택
```
"CLAUDE.md를 읽고 타로 Step 0 (주제 선택) 컴포넌트를 만들어줘.
TopicSelect.tsx — 3개 주제(timing/potential/direction) 중 택1.
선택하면 Zustand store에 topic 저장.
다크 배경(--ink) 위에 골드 보더 카드 3개.
선택 시 골드 하이라이트. 선택 후 버튼 활성화."
```

산출물:
- components/tarot/TopicSelect.tsx
- app/[locale]/reading/page.tsx (퍼널 컨테이너)

확인 포인트:
- 3개 주제 카드 클릭 → 하이라이트
- 선택 전 버튼 비활성 / 선택 후 활성

---

### Task 4: Step 1 — 카드 뽑기
```
"CLAUDE.md를 읽고 타로 카드 뽑기(Step 1)를 만들어줘.
CardDeck.tsx — 12장 카드 셔플 → 뒷면 표시 → 클릭 시 3D flip.
TarotCard.tsx — 개별 카드 (perspective + rotateY 180deg).
3장 뽑으면 다음 버튼 활성화.
프로토타입의 카드 뒤집기 애니메이션을 정확히 재현해줘."
```

산출물:
- components/tarot/CardDeck.tsx
- components/tarot/TarotCard.tsx

확인 포인트:
- 카드 셔플 매번 다른 순서
- 클릭 시 부드러운 3D flip
- 3장 초과 선택 불가
- 모바일에서 카드 크기 적절

---

### Task 5: Step 2 — 타로 결과 + 업셀
```
"CLAUDE.md를 읽고 타로 결과 화면(Step 2)을 만들어줘.
TarotResult.tsx — 선택한 3장(Present/Core Energy/Outcome)과 리딩 텍스트.
Upsell.tsx — '숫자로 확인하고 싶다면' 29,000 VND CTA.
LoadingOverlay.tsx — ✦ 회전 로딩 (1.8초 후 결과 표시).
리딩 텍스트는 tarot-data.ts의 READINGS에서 랜덤 선택."
```

산출물:
- components/tarot/TarotResult.tsx
- components/tarot/Upsell.tsx
- components/ui/LoadingOverlay.tsx

확인 포인트:
- 로딩 애니메이션 → 결과 전환 자연스러운지
- 업셀 CTA가 시각적으로 눈에 띄는지
- 29,000 VND 가격 표시 (취소선 99,000)

---

### Task 6: Step 3 — 유료 입력 플로우
```
"CLAUDE.md를 읽고 유료 입력 플로우(Step 3)를 만들어줘.
InputFlow.tsx — 4단계 대화형 입력 (직군→연차→도시→연봉).
FormStep.tsx — 개별 스텝 (옵션 선택 UI).
ProgressDots.tsx — 진행 인디케이터.
각 스텝 선택 후 다음 버튼 활성화. 연봉은 드롭다운.
결제 모킹: MVP에서는 '데이터로 확인' 버튼 → 바로 입력 플로우 진입."
```

산출물:
- components/funnel/InputFlow.tsx
- components/funnel/FormStep.tsx
- components/ui/ProgressDots.tsx

확인 포인트:
- 4단계 자연스러운 전환
- 선택 전 버튼 비활성
- 진행 인디케이터 정확

---

### Task 7: Step 4 — 결과 + 리드 캡처
```
"CLAUDE.md를 읽고 결과 화면(Step 4)을 만들어줘.
DataResult.tsx — +28% 큰 숫자, 근거 설명, 프로필 요약.
LeadCapture.tsx — 이름/학력/희망연봉 자발적 입력 + 건너뛰기 옵션.
연봉 계산은 lib/salary-calculator.ts 사용.
계산 API는 api/calculate/route.ts에 서버 라우트로."
```

산출물:
- components/funnel/DataResult.tsx
- components/funnel/LeadCapture.tsx
- components/funnel/Complete.tsx
- lib/salary-calculator.ts
- app/api/calculate/route.ts

확인 포인트:
- 입력값에 따라 % 숫자 변동
- HCMC +2%, 저연봉 +3%, 고연봉 -2% 보정 동작
- "건너뛰기"로 Step 5 진입 가능

---

### Task 8: 퍼널 통합 + 전환 로직
```
"CLAUDE.md를 읽고 전체 퍼널을 통합해줘.
reading/page.tsx에서 currentStep에 따라 Step 0~5를 전환.
스텝 간 전환 시 fadeUp 애니메이션.
스크롤 위치 자동 조정 (scrollIntoView).
전체 플로우를 처음부터 끝까지 테스트할 수 있게."
```

산출물:
- app/[locale]/reading/page.tsx (통합)

확인 포인트:
- Step 0 → 1 → 2 → 3 → 4 → 5 전체 흐름
- 뒤로가기/새로고침 시 상태 유지 여부
- 모바일 전체 플로우 테스트

---

### Task 9: 다국어 텍스트
```
"CLAUDE.md를 읽고 모든 UI 텍스트를 i18n으로 바꿔줘.
messages/vi.json에 베트남어, messages/en.json에 영어.
하드코딩된 텍스트 전부 useTranslations()로 교체.
타로 리딩 텍스트도 언어별로 분리."
```

산출물:
- messages/vi.json (전체)
- messages/en.json (전체)
- 모든 컴포넌트 i18n 적용

확인 포인트:
- /vi → 베트남어, /en → 영어 정상 전환
- 타로 리딩 텍스트 언어별 정상 출력

---

### Task 10: Supabase 연동 + 분석 이벤트
```
"CLAUDE.md를 읽고 Supabase 연동과 분석 이벤트를 추가해줘.
supabase/migrations/001_initial.sql 마이그레이션 작성.
각 퍼널 단계에서 PMF 이벤트 발생시키기.
lib/analytics.ts에 이벤트 트래킹 유틸 (초기엔 console.log + Supabase 저장).
readings, results, leads 테이블에 데이터 저장."
```

산출물:
- supabase/migrations/001_initial.sql
- lib/supabase.ts
- lib/analytics.ts
- components/analytics/FunnelTracker.tsx
- app/api/lead/route.ts

확인 포인트:
- 콘솔에 퍼널 이벤트 로그 출력
- Supabase에 데이터 저장 확인

---

## Claude Code 사용 팁

### 세션 시작 시 항상
```bash
# CLAUDE.md가 루트에 있으면 자동 참조됨
cd whisper-up
claude
```

### 효과적인 프롬프트 패턴
```
"CLAUDE.md를 읽고 [Task N]을 진행해줘.
[구체적 요구사항]
[참고할 기존 파일이 있다면 언급]
완료 후 어떤 파일이 변경됐는지 요약해줘."
```

### 디버깅 시
```
"[에러 메시지 붙여넣기]
이 에러가 발생하는 원인을 찾고 수정해줘.
수정 전후 diff를 보여줘."
```

### 리팩토링 시
```
"components/tarot/ 폴더의 코드를 리뷰하고,
중복 코드 제거 + 타입 안전성 개선해줘."
```

---

## 배포 체크리스트 (Phase 1 완료 후)

- [ ] Vercel 프로젝트 생성 + 환경변수 설정
- [ ] Supabase 프로덕션 프로젝트 생성
- [ ] 커스텀 도메인 연결 (whisper-up.vn 등)
- [ ] OG Image + SEO 메타 태그
- [ ] 모바일 PWA manifest (홈 화면 추가용)
- [ ] 에러 바운더리 + 404 페이지
- [ ] 퍼널 전환율 대시보드 (Supabase 쿼리 or PostHog)
