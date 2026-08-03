# [THE STANDARD] 01회 웨비나 랜딩페이지 설계

## 배경

`martinee-event`는 행사별 config(`config/events/<slug>.ts`) + 공유 컴포넌트 구조로 여러 랜딩페이지를 운영한다. 기존 `samsung-executive-dinner`는 오프라인 프라이빗 디너용으로 만들어졌고, 이번에 추가하는 페이지는 신규 시리즈 **[THE STANDARD]**의 1회차 무료 온라인 웨비나다.

- 주제: "AI 에이전트 시대, 변하지 않는 마케팅의 표준"
- 일시: 2026년 9월 17일 (온라인/웨비나, 오프라인 장소 없음)
- 후원/파트너 로고: AppsFlyer, Amplitude, Braze (실제 브랜드 파일 없음 → 텍스트 배지 placeholder)
- 세션: 20분 × 3개, 세부 주제/시간/발표자 미정
- 등록폼: 기존 구조 재사용하되 디너 특화 필드(식이 제한) 제거, 신규 Google Sheet 연동
- 추가 요구: 인터랙티브 후킹 요소 (카운트다운 타이머, 스크롤 인터랙션 강화, 간단 자가진단)

## 라우트 / 설정

- `app/martinee-thestandard-01/page.tsx` (samsung-executive-dinner/page.tsx 패턴 복제)
- `config/events/martinee-thestandard-01.ts` (samsung-executive-dinner.ts 패턴 복제)
- `config/types.ts`의 `EventConfig.registration`에 `showDietaryRestrictions: boolean` 필드 추가 (두 행사 config 모두 값 채워야 함 — 타입 필수 필드로 추가하므로 기존 samsung-executive-dinner.ts도 함께 수정)
- 신규 env: `.env.local.example`에 `NEXT_PUBLIC_GAS_WEB_APP_URL_MARTINEE_THESTANDARD_01` 추가, config의 `gasWebAppUrl`에서 참조
- 이 회차 전용 Apps Script 배포/시트는 사용자가 직접 진행 (google-apps-script/README.md 절차 그대로, 코드는 손댈 필요 없음)

## 페이지 구성 순서

```
Header → HeroSection → IntroSection → KeyMessageSection → DiagnosticSection(신규) → AgendaSection → RegistrationForm → Footer
```

- **VenueSection은 사용하지 않는다** (오프라인 장소 요소 불필요, import 자체를 제거)
- 신규 컴포넌트는 `DiagnosticSection` 하나만 추가하고, 나머지는 기존 공유 컴포넌트를 그대로 재사용한다.

## Hero 섹션

- 시리즈 라벨: 타이틀 위에 작은 배지/텍스트로 `[THE STANDARD]` 표시 (`hero.titleImageUrl: null` → 텍스트 타이틀 렌더링 경로 사용, HeroSection 컴포넌트 변경 없이 config만으로 처리 가능한지 확인 — 시리즈 라벨 자체는 HeroSection에 소폭 추가 필요)
- 타이틀: "AI 에이전트 시대, 변하지 않는 마케팅의 표준"
- 태그라인: 무료 웨비나 + 일시를 명확히 전달하는 문구
- date: "2026.09.17", location: "온라인 웨비나 (Zoom, 등록 후 링크 안내)"
- hostLogos: AppsFlyer / Amplitude / Braze — `logoUrl: null`로 두고 HeroSection의 텍스트 워드마크 처리 로직 사용 (samsung-executive-dinner에서 이미 `logoUrl: null`인 로고는 표시되지 않는 방식이므로, 텍스트 배지로 보여주려면 HeroSection에 "logoUrl 없을 때 텍스트 배지로 표시" 분기를 추가해야 함)
- **인터랙티브 ①: 카운트다운 타이머** — Hero 하단 CTA 인근에 웨비나 시작(2026-09-17 00:00 KST 기준 등 구체 시각은 구현 시 결정)까지 남은 일/시/분/초를 표시하는 클라이언트 컴포넌트. 행사 종료/시작 이후에는 타이머 대신 "진행 중/종료" 문구로 대체.

## Intro / KeyMessage 섹션

- 기존 컴포넌트 그대로 사용, config 콘텐츠만 신규 작성
- KeyMessage 3항목 예시 방향: ① AI 에이전트가 대신 설계하는 고객 여정 ② 그럼에도 변하지 않는 데이터 기반 판단의 표준 ③ AppsFlyer·Amplitude·Braze로 완성하는 통합 스택
- 정확한 카피는 구현 단계에서 확정 (스펙에서 문구를 못 박지 않고, 구현 플랜에서 최종 문구 작성)

## DiagnosticSection (신규, 인터랙티브 ②)

- 위치: KeyMessageSection과 AgendaSection 사이
- 형태: "우리 팀은 AI 에이전트 시대 마케팅 표준을 갖췄는가?" 컨셉의 3~4문항 자가진단 카드
- 동작: 클라이언트 컴포넌트, 문항에 하나씩 응답(버튼 클릭) → 마지막에 결과 메시지 + 웨비나 참석 유도 카피 노출. 서버 저장/스코어링 로직 없이 프론트 상태만으로 동작 (백엔드 연동 불필요, 순수 후킹용 UI)
- framer-motion으로 문항 전환 애니메이션 적용

## AgendaSection (타임테이블)

- 기존 컴포넌트/구조 재사용 (`config.agenda` 배열)
- 세션 3개 × 20분, 시간/발표자 미정 상태이므로 각 항목은 order/title만 채우고 time·description은 "추후 공개" 형태의 placeholder로 작성
- 실제 시간표가 나오면 config 파일의 `agenda` 배열만 수정하면 되는 구조 (컴포넌트 변경 불필요)

## RegistrationForm / 등록폼

- 기존 `RegistrationForm` 컴포넌트, `lib/validation.ts`, `lib/submitRegistration.ts` 재사용
- **`dietaryRestrictions` 필드를 행사별로 노출/숨김 가능하게 만든다**: `EventConfig`의 `registration`에 `showDietaryRestrictions: boolean` 같은 플래그를 추가하고, `RegistrationForm`은 이 값이 `true`일 때만 해당 input을 렌더링한다.
  - `validation.ts`의 `dietaryRestrictions` 필드는 그대로 `optional()`로 유지 (필드가 숨겨져도 값이 없으면 통과하므로 스키마 변경은 불필요)
  - `samsung-executive-dinner.ts`는 `showDietaryRestrictions: true`로 설정해 기존 동작 유지
  - `martinee-thestandard-01.ts`는 `showDietaryRestrictions: false`로 설정해 필드를 숨김
- 나머지 필드(이름/회사/부서/직책/이메일/휴대폰/기타 요청사항/개인정보 동의)는 두 행사 모두 동일하게 유지
- `gasWebAppUrl`만 신규 env로 교체하여 다른 시트로 연결

## 인터랙티브 ③: 스크롤 인터랙션 강화

- 기존 `MotionWrapper`(스크롤 reveal)를 그대로 활용하되, Hero 배경 그래픽에 스크롤 기반 패럴랙스 효과를 소폭 추가해 스크롤 시 체감되는 움직임을 강화
- 새로운 라이브러리 추가 없이 기존 framer-motion만으로 구현

## 모바일 반응형

- 기존 컴포넌트들이 이미 `md:` 브레이크포인트 기반 반응형 구조를 따르고 있으므로 동일 패턴 유지
- 신규 DiagnosticSection과 카운트다운 타이머도 동일하게 모바일 우선으로 레이아웃 구성 (카운트다운은 모바일에서 한 줄에 4개 숫자 블록이 들어가도록, 진단 카드도 모바일에서 세로 스택)

## SEO / Footer

- `seo.description`, `ogTitle`, `ogDescription`, `footer.brandName` 등은 시리즈명 + 회차 + 웨비나 주제를 반영해 신규 작성
- OG 이미지는 기존과 동일하게 placeholder 유지 (`/images/og-placeholder.svg`), 추후 실제 이미지 교체 필요

## 범위에서 제외한 것

- 실제 AppsFlyer/Amplitude/Braze 로고 파일, 실제 웨비나 참여 링크(Zoom 등), 실제 발표자/시간표, 실제 Apps Script 배포는 이 작업 범위 밖 — 모두 placeholder로 남기고 사용자가 추후 채워 넣는다.
