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

  agendaSection: {
    title: "TIME TABLE",
    description: "20분씩 이어지는 3개 세션으로 구성됩니다",
  },

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
