# [THE STANDARD] 01회 웨비나 랜딩페이지 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** martinee-event 저장소에 `[THE STANDARD]` 시리즈 1회 무료 웨비나("AI 에이전트 시대, 변하지 않는 마케팅의 표준", 2026-09-17) 랜딩페이지를 새 라우트(`app/martinee-thestandard-01`)로 추가한다.

**Architecture:** 기존 `samsung-executive-dinner` 패턴(공유 컴포넌트 + `config/events/<slug>.ts`)을 그대로 따른다. `EventConfig` 타입에 시리즈 라벨/파트너 로고/카운트다운/등록폼 필드 토글을 위한 필드를 추가하고, 기존 `samsung-executive-dinner.ts`도 함께 갱신해 타입을 만족시킨다. `VenueSection`은 새 페이지에서 사용하지 않는다. 신규 인터랙티브 요소(카운트다운 타이머, 자가진단 섹션, Hero 배경 패럴랙스)는 별도 컴포넌트로 분리한다.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, framer-motion, react-hook-form + zod, lucide-react.

## Global Constraints

- 이 저장소에는 테스트 러너(jest/vitest 등)가 설치돼 있지 않다. `package.json`의 스크립트는 `dev`/`build`/`start`/`lint`뿐이다. 따라서 각 태스크의 검증은 **타입 체크(`npx tsc --noEmit`)**, **lint(`npm run lint`)**, 그리고 마지막 태스크의 **dev 서버 스모크 테스트**로 대체한다. 새로 테스트 러너를 추가하지 않는다 (YAGNI, 기존 컨벤션 유지).
- 기존 `samsung-executive-dinner` 페이지의 시각적 동작을 깨뜨리지 않는다. `EventConfig`에 필드를 추가할 때는 반드시 `config/events/samsung-executive-dinner.ts`도 함께 갱신해 기존 동작(호스트 로고 숨김, 식이 제한 필드 노출, 카운트다운 없음)을 유지한다.
- 모든 신규 텍스트는 한국어로 작성한다 (기존 config들과 동일).
- Tailwind 유틸리티 클래스와 디자인 토큰(`text-headline-*`, `text-body-*`, `text-label-*`, `bg-primary` 등, `app/globals.css` 참고)만 사용하고 새 커스텀 CSS를 추가하지 않는다.
- 새로운 npm 패키지를 추가하지 않는다 (framer-motion만으로 카운트다운/패럴랙스/자가진단 인터랙션 구현).

---

### Task 1: `EventConfig` 타입 확장 + `samsung-executive-dinner.ts` 갱신

**Files:**
- Modify: `config/types.ts`
- Modify: `config/events/samsung-executive-dinner.ts`

**Interfaces:**
- Produces: `EventConfig.hero.seriesLabel: string | null`, `EventConfig.hero.partnerLogos: { name: string }[]`, `EventConfig.hero.countdownTargetAt: string | null`, `EventConfig.registration.showDietaryRestrictions: boolean` — 이후 모든 태스크가 이 필드들을 참조한다.

- [ ] **Step 1: `config/types.ts`의 `hero`, `registration` 블록을 아래처럼 수정**

`hero` 블록 전체를 다음으로 교체:

```ts
  hero: {
    // 행사명을 이미지(로고/워드마크)로 대체하고 싶을 때 경로 지정. null이면 텍스트로 표시.
    titleImageUrl: string | null;
    // 시리즈물의 회차 배지로 쓰는 라벨(예: "[THE STANDARD]"). null이면 표시 안 함.
    seriesLabel: string | null;
    // 주최사 로고. logoUrl이 있는 항목만 Hero에 이미지로 표시됩니다.
    hostLogos: { name: string; logoUrl: string | null }[];
    // 이미지 로고가 없는 파트너/후원사를 텍스트 배지로 표시하고 싶을 때 사용.
    partnerLogos: { name: string }[];
    // Hero 배경에 넣을 장식용 그래픽. null이면 표시 안 함.
    backgroundGraphicUrl: string | null;
    // 웨비나/행사 시작 시각(ISO 8601). null이면 카운트다운을 표시하지 않음.
    countdownTargetAt: string | null;
  };
```

`registration` 블록 마지막에 필드 추가 (`errorMessage: string;` 다음 줄):

```ts
    errorMessage: string;
    // 식이 제한/알레르기 입력 필드를 등록폼에 노출할지 여부. 오프라인 식사가 있는 행사만 true.
    showDietaryRestrictions: boolean;
```

- [ ] **Step 2: `config/events/samsung-executive-dinner.ts`의 `hero`, `registration` 블록을 새 필드로 갱신**

`hero` 블록을 다음으로 교체:

```ts
  hero: {
    titleImageUrl: "/images/event-title.png",
    seriesLabel: null,
    hostLogos: [
      { name: "Martinee", logoUrl: null },
      { name: "Amplitude", logoUrl: null },
    ],
    partnerLogos: [],
    backgroundGraphicUrl: "/images/hero-graphic.png",
    countdownTargetAt: null,
  },
```

`registration` 블록의 `errorMessage` 다음 줄에 추가:

```ts
    errorMessage: "신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    showDietaryRestrictions: true,
```

- [ ] **Step 3: 타입 체크로 두 파일이 `EventConfig`를 여전히 만족하는지 확인**

Run: `cd /Users/martinee/Documents/GitHub/martinee-event && npx tsc --noEmit`
Expected: 에러 없음 (기존에 에러가 있었다면 이 태스크로 인한 새 에러만 없으면 통과로 간주).

- [ ] **Step 4: Commit**

```bash
cd /Users/martinee/Documents/GitHub/martinee-event
git add config/types.ts config/events/samsung-executive-dinner.ts
git commit -m "feat: add series label, partner logos, countdown, dietary toggle fields to EventConfig"
```

---

### Task 2: `CountdownTimer` 컴포넌트 신규 작성

**Files:**
- Create: `components/CountdownTimer.tsx`

**Interfaces:**
- Consumes: 없음 (독립 컴포넌트)
- Produces: `CountdownTimer({ targetDate }: { targetDate: string })` — Task 3에서 `HeroSection`이 이 컴포넌트를 `import { CountdownTimer } from "./CountdownTimer"`로 사용한다.

- [ ] **Step 1: `components/CountdownTimer.tsx` 작성**

```tsx
"use client";

import { useEffect, useState } from "react";

type CountdownTimerProps = {
  targetDate: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(targetDate: string): TimeLeft | null {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetDate));
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft === null) {
    return (
      <p className="mt-10 text-body-md text-on-surface-variant">
        웨비나가 곧 시작되거나 이미 진행되었습니다.
      </p>
    );
  }

  const units: { label: string; value: number }[] = [
    { label: "일", value: timeLeft.days },
    { label: "시간", value: timeLeft.hours },
    { label: "분", value: timeLeft.minutes },
    { label: "초", value: timeLeft.seconds },
  ];

  return (
    <div className="mt-10 grid grid-cols-4 gap-3 md:flex md:gap-4">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center rounded-xl border border-outline-variant/30 bg-surface px-3 py-3 md:px-5 md:py-4"
        >
          <span className="text-headline-md font-bold text-primary md:text-headline-lg">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-label-sm text-on-surface-variant">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: 타입 체크**

Run: `cd /Users/martinee/Documents/GitHub/martinee-event && npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 3: lint**

Run: `cd /Users/martinee/Documents/GitHub/martinee-event && npm run lint`
Expected: 에러 없음

- [ ] **Step 4: Commit**

```bash
cd /Users/martinee/Documents/GitHub/martinee-event
git add components/CountdownTimer.tsx
git commit -m "feat: add CountdownTimer component"
```

---

### Task 3: `HeroSection`에 시리즈 라벨/파트너 로고/카운트다운/패럴랙스 반영

**Files:**
- Modify: `components/HeroSection.tsx`

**Interfaces:**
- Consumes: `CountdownTimer` (Task 2), `EventConfig.hero.seriesLabel`/`partnerLogos`/`countdownTargetAt` (Task 1)
- Produces: `HeroSection`은 기존과 동일한 `{ config }: { config: EventConfig }` prop 시그니처를 유지한다 — 다른 태스크에서 이 컴포넌트의 사용법은 바뀌지 않는다.

- [ ] **Step 1: `components/HeroSection.tsx` 전체를 아래로 교체**

```tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import type { EventConfig } from "@/config/types";
import { CountdownTimer } from "./CountdownTimer";

export function HeroSection({ config }: { config: EventConfig }) {
  const hostLogos = config.hero.hostLogos.filter((logo) => logo.logoUrl);
  const { scrollY } = useScroll();
  const graphicY = useTransform(scrollY, [0, 600], [0, 80]);

  return (
    <section
      id="top"
      className="relative flex min-h-[85vh] items-end overflow-hidden bg-gradient-to-b from-[#F7F8FF] to-white pb-16 md:pb-24"
    >
      {config.hero.backgroundGraphicUrl ? (
        <motion.div
          style={{ y: graphicY }}
          className="pointer-events-none absolute inset-x-0 top-20 z-0 mx-auto w-full max-w-[1440px] select-none px-[20px] md:px-[64px]"
        >
          <Image
            src={config.hero.backgroundGraphicUrl}
            alt=""
            width={1920}
            height={1080}
            priority
            className="h-auto w-full"
            aria-hidden="true"
          />
        </motion.div>
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-[20px] md:px-[64px]">
        <div className="max-w-3xl">
          {config.hero.seriesLabel ? (
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1 text-label-md font-semibold uppercase tracking-widest text-primary">
              {config.hero.seriesLabel}
            </span>
          ) : null}

          {config.hero.titleImageUrl ? (
            <h1 className="mb-8">
              <Image
                src={config.hero.titleImageUrl}
                alt={config.title}
                width={1191}
                height={325}
                priority
                className="h-auto w-full max-w-[420px]"
              />
            </h1>
          ) : (
            <h1 className="mb-8 font-display text-display-mobile leading-none text-on-background md:text-display">
              {config.title}
            </h1>
          )}

          <p className="mb-8 text-body-lg text-on-surface-variant">
            {config.tagline}
          </p>

          <div className="flex flex-col gap-6 md:flex-row md:gap-12">
            <div className="flex items-center gap-3">
              <Calendar className="text-primary" size={20} aria-hidden="true" />
              <span className="text-body-lg text-on-surface-variant">
                {config.date}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-primary" size={20} aria-hidden="true" />
              <span className="text-body-lg text-on-surface-variant">
                {config.location}
              </span>
            </div>
          </div>

          <a
            href="#register"
            className="mt-10 inline-block rounded-full bg-primary px-12 py-6 text-headline-md font-bold text-on-primary transition-all hover:bg-primary-container active:scale-95"
          >
            {config.ctaLabel}
          </a>

          {config.hero.countdownTargetAt ? (
            <CountdownTimer targetDate={config.hero.countdownTargetAt} />
          ) : null}

          {hostLogos.length > 0 || config.hero.partnerLogos.length > 0 ? (
            <div className="mt-12 flex flex-wrap items-center gap-8">
              {hostLogos.map((logo) => (
                <Image
                  key={logo.name}
                  src={logo.logoUrl as string}
                  alt={logo.name}
                  width={297}
                  height={57}
                  className="h-10 w-auto"
                />
              ))}
              {config.hero.partnerLogos.map((logo) => (
                <span
                  key={logo.name}
                  className="rounded-full border border-outline-variant/40 px-5 py-2 text-label-md font-semibold tracking-wide text-on-surface-variant"
                >
                  {logo.name}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 타입 체크 + lint**

Run: `cd /Users/martinee/Documents/GitHub/martinee-event && npx tsc --noEmit && npm run lint`
Expected: 에러 없음

- [ ] **Step 3: dev 서버로 기존 samsung-executive-dinner 페이지가 그대로 렌더링되는지 확인**

Run:
```bash
cd /Users/martinee/Documents/GitHub/martinee-event
npm run dev &
sleep 3
curl -s http://localhost:3000/samsung-executive-dinner | grep -o "Executive Dinner for SAMSUNG"
kill %1
```
Expected: `Executive Dinner for SAMSUNG` 문자열이 출력됨 (기존 페이지가 여전히 정상 렌더링됨을 확인). `hostLogos`가 `logoUrl: null`이므로 파트너 로고 텍스트 배지나 카운트다운은 출력되지 않아야 함 — 응답 본문에 "일</span>" 같은 카운트다운 마크업이 없는지 눈으로 확인.

- [ ] **Step 4: Commit**

```bash
cd /Users/martinee/Documents/GitHub/martinee-event
git add components/HeroSection.tsx
git commit -m "feat: add series label, partner logo badges, countdown, and scroll parallax to HeroSection"
```

---

### Task 4: `RegistrationForm`의 식이 제한 필드를 조건부 렌더링으로 변경

**Files:**
- Modify: `components/RegistrationForm.tsx`

**Interfaces:**
- Consumes: `EventConfig.registration.showDietaryRestrictions` (Task 1)
- Produces: `RegistrationForm`의 prop 시그니처(`{ config }: { config: EventConfig }`)는 변경 없음.

- [ ] **Step 1: `components/RegistrationForm.tsx`에서 식이 제한 입력 블록을 조건부로 감싸기**

기존:

```tsx
              <div className="flex flex-col gap-2">
                <label className={labelClass} htmlFor="dietaryRestrictions">
                  식이 제한 / 알레르기
                </label>
                <input
                  id="dietaryRestrictions"
                  type="text"
                  placeholder="예: 없음, 채식, 특정 알레르기 등"
                  className={fieldClass}
                  {...register("dietaryRestrictions")}
                />
              </div>
```

를 다음으로 교체:

```tsx
              {config.registration.showDietaryRestrictions ? (
                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="dietaryRestrictions">
                    식이 제한 / 알레르기
                  </label>
                  <input
                    id="dietaryRestrictions"
                    type="text"
                    placeholder="예: 없음, 채식, 특정 알레르기 등"
                    className={fieldClass}
                    {...register("dietaryRestrictions")}
                  />
                </div>
              ) : null}
```

- [ ] **Step 2: 타입 체크 + lint**

Run: `cd /Users/martinee/Documents/GitHub/martinee-event && npx tsc --noEmit && npm run lint`
Expected: 에러 없음

- [ ] **Step 3: dev 서버로 samsung-executive-dinner 페이지에는 필드가 여전히 보이는지 확인**

Run:
```bash
cd /Users/martinee/Documents/GitHub/martinee-event
npm run dev &
sleep 3
curl -s http://localhost:3000/samsung-executive-dinner | grep -o "식이 제한 / 알레르기"
kill %1
```
Expected: `식이 제한 / 알레르기` 문자열이 출력됨 (기존 페이지는 `showDietaryRestrictions: true`이므로 필드가 그대로 보여야 함).

- [ ] **Step 4: Commit**

```bash
cd /Users/martinee/Documents/GitHub/martinee-event
git add components/RegistrationForm.tsx
git commit -m "feat: make dietary restrictions field conditional on event config"
```

---

### Task 5: `DiagnosticSection` 컴포넌트 신규 작성

**Files:**
- Create: `components/DiagnosticSection.tsx`

**Interfaces:**
- Consumes: `SectionTitle` (기존 컴포넌트, `{ title, description }` props)
- Produces: `DiagnosticSection()` — props 없는 독립 컴포넌트. Task 7의 `app/martinee-thestandard-01/page.tsx`에서 `<DiagnosticSection />`으로 사용한다.

- [ ] **Step 1: `components/DiagnosticSection.tsx` 작성**

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SectionTitle } from "./SectionTitle";

const QUESTIONS = [
  "AI 에이전트가 고객 여정의 일부를 대신 설계하고 있다는 걸 체감하시나요?",
  "여러 채널의 데이터를 하나의 기준으로 통합해서 보고 계신가요?",
  "캠페인 성과를 실시간으로 확인하고 다음 액션까지 자동화하고 있나요?",
];

export function DiagnosticSection() {
  const [step, setStep] = useState(0);
  const isDone = step >= QUESTIONS.length;

  function answer() {
    setStep((prev) => prev + 1);
  }

  function restart() {
    setStep(0);
  }

  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-[20px]">
        <SectionTitle
          title="우리 팀은 AI 에이전트 시대 마케팅 표준을 갖췄나요?"
          description="3가지 질문에 답하며 우리 팀의 마케팅 표준을 점검해보세요."
        />

        <div className="relative min-h-[220px] overflow-hidden rounded-2xl border border-outline-variant/20 bg-background-alt p-8 md:p-12">
          <AnimatePresence mode="wait">
            {!isDone ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-8 text-center"
              >
                <span className="text-label-md uppercase tracking-widest text-primary">
                  질문 {step + 1} / {QUESTIONS.length}
                </span>
                <p className="text-headline-md text-on-background">
                  {QUESTIONS[step]}
                </p>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={answer}
                    className="rounded-full bg-primary px-8 py-3 text-label-md font-semibold text-on-primary transition-all hover:bg-primary-container active:scale-95"
                  >
                    예
                  </button>
                  <button
                    type="button"
                    onClick={answer}
                    className="rounded-full border border-outline-variant px-8 py-3 text-label-md font-semibold text-on-surface-variant transition-all hover:bg-surface active:scale-95"
                  >
                    아니오
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-6 text-center"
              >
                <p className="text-headline-md text-on-background">
                  지금이 마케팅 표준을 다시 세울 시점입니다.
                </p>
                <p className="text-body-md text-on-surface-variant">
                  [THE STANDARD] 웨비나에서 AppsFlyer · Amplitude · Braze와 함께
                  답을 확인하세요.
                </p>
                <div className="flex gap-4">
                  <a
                    href="#register"
                    className="rounded-full bg-primary px-8 py-3 text-label-md font-semibold text-on-primary transition-all hover:bg-primary-container active:scale-95"
                  >
                    무료 등록하기
                  </a>
                  <button
                    type="button"
                    onClick={restart}
                    className="rounded-full border border-outline-variant px-8 py-3 text-label-md font-semibold text-on-surface-variant transition-all hover:bg-surface active:scale-95"
                  >
                    다시 진단하기
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 타입 체크 + lint**

Run: `cd /Users/martinee/Documents/GitHub/martinee-event && npx tsc --noEmit && npm run lint`
Expected: 에러 없음

- [ ] **Step 3: Commit**

```bash
cd /Users/martinee/Documents/GitHub/martinee-event
git add components/DiagnosticSection.tsx
git commit -m "feat: add DiagnosticSection interactive self-check component"
```

---

### Task 6: `config/events/martinee-thestandard-01.ts` 작성

**Files:**
- Create: `config/events/martinee-thestandard-01.ts`

**Interfaces:**
- Consumes: `EventConfig` 타입 (Task 1)
- Produces: `eventConfig` — Task 7의 `app/martinee-thestandard-01/page.tsx`에서 `import { eventConfig } from "@/config/events/martinee-thestandard-01"`로 사용한다.

- [ ] **Step 1: `config/events/martinee-thestandard-01.ts` 작성**

```ts
import type { EventConfig } from "../types";

// [THE STANDARD] 시리즈 01회 무료 웨비나. 세부 진행 시간/발표자는 추후 확정되면
// agenda 배열만 수정하면 됩니다 (컴포넌트 변경 불필요).
export const eventConfig = {
  title: "AI 에이전트 시대, 변하지 않는 마케팅의 표준",
  tagline: "무료 온라인 웨비나 · [THE STANDARD] 01 · 2026.09.17",
  date: "2026.09.17",
  location: "온라인 웨비나 (등록 후 참여 링크 개별 안내)",
  host: ["Martinee", "AppsFlyer", "Amplitude", "Braze"],
  contactEmail: "mkt@martinee.io",
  ctaLabel: "무료 웨비나 등록하기",

  nav: {
    brandName: "THE STANDARD",
    logoUrl: "/logos/martinee.svg",
  },

  hero: {
    titleImageUrl: null,
    seriesLabel: "[THE STANDARD]",
    hostLogos: [],
    partnerLogos: [
      { name: "AppsFlyer" },
      { name: "Amplitude" },
      { name: "Braze" },
    ],
    backgroundGraphicUrl: "/images/hero-graphic.png",
    countdownTargetAt: "2026-09-17T00:00:00+09:00",
  },

  intro: {
    heading: "AI 에이전트가 여정을 설계해도, 표준은 사람이 정합니다",
    body: [
      "AI 에이전트가 고객과의 접점을 자동으로 설계하고 실행하는 시대가 되었습니다. 채널은 늘어나고 의사결정은 더 빨라지고 있습니다.",
      "그럼에도 변하지 않는 것이 있습니다. 정확한 데이터를 기반으로 판단하고, 채널 간 기준을 통일하고, 성과를 빠르게 검증하는 마케팅의 표준입니다.",
      "[THE STANDARD] 시리즈 첫 번째 웨비나에서는 AppsFlyer, Amplitude, Braze와 함께 AI 에이전트 시대에도 변하지 않는 마케팅 표준을 살펴봅니다.",
    ],
  },

  keyMessages: [
    {
      title: "AI 에이전트가 대신 설계하는 여정",
      description:
        "AI 에이전트가 고객 여정의 상당 부분을 자동으로 설계하고 실행하는 흐름을 살펴보고, 마케터가 무엇을 준비해야 하는지 짚어봅니다.",
    },
    {
      title: "변하지 않는 데이터 기반 판단",
      description:
        "채널이 늘어날수록 중요해지는 것은 하나의 기준으로 통합된 데이터입니다. 판단의 표준을 다시 세우는 방법을 다룹니다.",
    },
    {
      title: "AppsFlyer · Amplitude · Braze 표준 스택",
      description:
        "어트리뷰션, 프로덕트 애널리틱스, 고객 인게이지먼트를 잇는 표준 스택을 실제 활용 사례로 소개합니다.",
    },
  ],

  agenda: [
    {
      order: "01",
      title: "Session 1",
      time: "20분 · 시간 추후 공개",
      description: "세부 주제는 추후 공개됩니다.",
      highlight: false,
    },
    {
      order: "02",
      title: "Session 2",
      time: "20분 · 시간 추후 공개",
      description: "세부 주제는 추후 공개됩니다.",
      highlight: false,
    },
    {
      order: "03",
      title: "Session 3",
      time: "20분 · 시간 추후 공개",
      description: "세부 주제는 추후 공개됩니다.",
      highlight: false,
    },
  ],

  venue: {
    address: "온라인 웨비나",
    description: "이 행사는 온라인으로 진행되며 별도 오프라인 장소가 없습니다.",
    mapUrl: null,
    images: [],
  },

  registration: {
    heading: "무료 사전 등록",
    description: "등록해주시면 웨비나 참여 링크를 개별 안내드립니다.",
    privacyConsentLabel:
      "웨비나 참여 안내를 위해 입력하신 개인정보를 수집 및 이용하는 데 동의합니다.",
    privacyPolicyLinkLabel: "자세히 보기",
    successMessage:
      "등록이 완료되었습니다. 웨비나 참여 링크를 개별 안내드리겠습니다.",
    errorMessage: "등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    showDietaryRestrictions: false,
  },

  // 이 행사 전용 Google Apps Script Web App URL (google-apps-script/README.md 참고)
  gasWebAppUrl: process.env.NEXT_PUBLIC_GAS_WEB_APP_URL_MARTINEE_THESTANDARD_01,

  footer: {
    brandName: "[THE STANDARD] by Martinee",
    copyright: "© 2026 Martinee io. All rights reserved.",
    privacyPolicyUrl:
      "https://martinee.notion.site/7cab6d3779c546fc801f79415646c03c",
  },

  seo: {
    description:
      "[THE STANDARD] 01 - AI 에이전트 시대, 변하지 않는 마케팅의 표준을 다루는 무료 온라인 웨비나. AppsFlyer, Amplitude, Braze와 함께합니다.",
    ogTitle: "[THE STANDARD] AI 에이전트 시대, 변하지 않는 마케팅의 표준",
    ogDescription:
      "AppsFlyer, Amplitude, Braze와 함께하는 무료 웨비나. AI 에이전트 시대에도 변하지 않는 마케팅의 표준을 확인하세요.",
  },
} satisfies EventConfig;
```

- [ ] **Step 2: 타입 체크**

Run: `cd /Users/martinee/Documents/GitHub/martinee-event && npx tsc --noEmit`
Expected: 에러 없음 (`satisfies EventConfig`가 통과해야 함)

- [ ] **Step 3: Commit**

```bash
cd /Users/martinee/Documents/GitHub/martinee-event
git add config/events/martinee-thestandard-01.ts
git commit -m "feat: add event config for THE STANDARD 01 webinar"
```

---

### Task 7: 라우트 페이지 + env 예시 추가

**Files:**
- Create: `app/martinee-thestandard-01/page.tsx`
- Modify: `.env.local.example`

**Interfaces:**
- Consumes: `eventConfig` (Task 6), `HeroSection`/`IntroSection`/`KeyMessageSection`/`DiagnosticSection`/`AgendaSection`/`RegistrationForm`/`Header`/`Footer` (기존 + Task 3, Task 5)
- Produces: `/martinee-thestandard-01` 라우트 — 최종 사용자가 브라우저로 접근하는 지점.

- [ ] **Step 1: `app/martinee-thestandard-01/page.tsx` 작성**

```tsx
import type { Metadata } from "next";
import { AgendaSection } from "@/components/AgendaSection";
import { DiagnosticSection } from "@/components/DiagnosticSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { IntroSection } from "@/components/IntroSection";
import { KeyMessageSection } from "@/components/KeyMessageSection";
import { RegistrationForm } from "@/components/RegistrationForm";
import { eventConfig } from "@/config/events/martinee-thestandard-01";

export const metadata: Metadata = {
  title: `${eventConfig.title} | Martinee`,
  description: eventConfig.seo.description,
  openGraph: {
    title: eventConfig.seo.ogTitle,
    description: eventConfig.seo.ogDescription,
    type: "website",
    // TODO: 실제 OG 이미지 제공 시 /public/images/og-placeholder.svg 를 실제 이미지로 교체
    images: [{ url: "/images/og-placeholder.svg" }],
  },
};

export default function MartineeTheStandard01Page() {
  return (
    <>
      <Header config={eventConfig} />
      <main>
        <HeroSection config={eventConfig} />
        <IntroSection config={eventConfig} />
        <KeyMessageSection config={eventConfig} />
        <DiagnosticSection />
        <AgendaSection config={eventConfig} />
        <RegistrationForm config={eventConfig} />
      </main>
      <Footer config={eventConfig} />
    </>
  );
}
```

- [ ] **Step 2: `.env.local.example`에 신규 env 변수 추가**

기존 파일의 `NEXT_PUBLIC_GAS_WEB_APP_URL_SAMSUNG_EXECUTIVE_DINNER=YOUR_GAS_WEB_APP_URL_HERE` 줄 다음에 추가:

```
NEXT_PUBLIC_GAS_WEB_APP_URL_MARTINEE_THESTANDARD_01=YOUR_GAS_WEB_APP_URL_HERE
```

- [ ] **Step 3: 타입 체크 + lint**

Run: `cd /Users/martinee/Documents/GitHub/martinee-event && npx tsc --noEmit && npm run lint`
Expected: 에러 없음

- [ ] **Step 4: dev 서버로 새 라우트 스모크 테스트**

Run:
```bash
cd /Users/martinee/Documents/GitHub/martinee-event
npm run dev &
sleep 3
curl -s http://localhost:3000/martinee-thestandard-01 | grep -o "AI 에이전트 시대, 변하지 않는 마케팅의 표준" | head -1
curl -s http://localhost:3000/martinee-thestandard-01 | grep -o "AppsFlyer"
curl -s http://localhost:3000/martinee-thestandard-01 | grep -o "질문 1 / 3"
kill %1
```
Expected: 세 grep 모두 최소 1줄 이상 출력됨 (타이틀, 파트너 로고 배지, 진단 섹션 첫 문항이 렌더링됨을 확인).

- [ ] **Step 5: Commit**

```bash
cd /Users/martinee/Documents/GitHub/martinee-event
git add app/martinee-thestandard-01/page.tsx .env.local.example
git commit -m "feat: add THE STANDARD 01 webinar landing page route"
```

---

### Task 8: 최종 통합 확인 (데스크톱/모바일 반응형 육안 확인)

**Files:**
- (변경 없음 — 검증 전용 태스크)

**Interfaces:**
- Consumes: Task 1~7의 모든 결과물
- Produces: 없음 (최종 QA)

- [ ] **Step 1: dev 서버 기동**

Run: `cd /Users/martinee/Documents/GitHub/martinee-event && npm run dev`

- [ ] **Step 2: 브라우저에서 데스크톱 뷰포트로 `/martinee-thestandard-01` 확인**

확인 항목:
- Hero: `[THE STANDARD]` 배지, 타이틀, 태그라인, 날짜, 위치("온라인 웨비나"), CTA 버튼, 카운트다운 4블록(일/시간/분/초), AppsFlyer/Amplitude/Braze 텍스트 배지가 모두 보이는지
- 스크롤 시 Hero 배경 그래픽이 미세하게 패럴랙스로 움직이는지
- IntroSection, KeyMessageSection(3카드) 정상 렌더링
- DiagnosticSection: 질문 클릭 시 3문항을 거쳐 결과 화면(등록 유도 CTA)까지 자연스럽게 전환되는지, "다시 진단하기" 클릭 시 처음으로 리셋되는지
- AgendaSection: 3개 세션(20분 · 시간 추후 공개)이 순서대로 보이는지
- RegistrationForm: 식이 제한 필드가 **보이지 않는지**, 나머지 필드(이름/회사/부서/직책/이메일/휴대폰/기타 요청사항/개인정보 동의)는 정상 표시되는지
- Footer: `[THE STANDARD] by Martinee` 표기 확인

- [ ] **Step 3: 브라우저 개발자도구로 모바일 뷰포트(예: 390x844)로 동일 페이지 확인**

확인 항목:
- 모든 섹션이 가로 스크롤 없이 세로로 자연스럽게 쌓이는지
- 카운트다운 4블록이 모바일에서도 한 줄에 들어가는지 (`grid-cols-4`)
- DiagnosticSection의 버튼(예/아니오, 등록하기/다시 진단하기)이 모바일에서도 터치하기 충분한 크기인지
- Header/Footer가 모바일에서 겹치거나 잘리지 않는지

- [ ] **Step 4: 기존 `samsung-executive-dinner` 페이지도 함께 재확인 (회귀 확인)**

브라우저에서 `/samsung-executive-dinner` 접속 후:
- Hero에 카운트다운/파트너 로고 배지가 나타나지 않는지 (여전히 `hostLogos`가 모두 `logoUrl: null`이라 로고 자체가 표시되지 않는 기존 동작 유지)
- 등록폼에 식이 제한 필드가 여전히 보이는지
- 배경 그래픽 패럴랙스가 과하지 않고 기존 톤을 해치지 않는지

- [ ] **Step 5: dev 서버 종료**

Run: 실행 중인 `npm run dev` 프로세스를 `Ctrl+C` 또는 `kill`로 종료

이 태스크는 커밋할 코드 변경이 없으므로 커밋 없음. 문제가 발견되면 해당 태스크로 돌아가 수정 후 재검증한다.
