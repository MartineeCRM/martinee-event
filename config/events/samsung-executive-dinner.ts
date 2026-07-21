import type { EventConfig } from "../types";

// 행사 정보를 한 곳에서 관리합니다. 새 행사를 추가할 때는 이 파일을 복제해서
// config/events/ 아래에 새로 만들고, app/ 아래 같은 이름의 라우트를 추가하면 됩니다.
export const eventConfig = {
  title: "Executive Dinner for SAMSUNG",
  tagline: "AI 시대, 데이터 기반 의사결정의 새로운 기준",
  date: "2026.09.08",
  location: "서울, 추후 안내",
  host: ["Martinee", "Amplitude"],
  contactEmail: "mkt@martinee.io",
  ctaLabel: "참가 등록하기",

  nav: {
    brandName: "EXECUTIVE DINNER",
  },

  hero: {
    // TODO: 행사명을 이미지(로고/워드마크)로 넣으려면 /public/images/event-title.png 에
    // 파일을 추가하고 아래 경로를 채우세요. null이면 텍스트(title)로 표시됩니다.
    titleImageUrl: null,
    // TODO: 주최사 로고 제공 시 /public/logos/ 에 추가하고 logoUrl을 채우세요.
    // logoUrl이 있는 항목만 Hero에 표시됩니다.
    hostLogos: [
      { name: "Martinee", logoUrl: null },
      { name: "Amplitude", logoUrl: null },
    ],
  },

  intro: {
    heading: "AI 시대, 의사결정의 기준이 달라지고 있습니다",
    body: [
      "AI가 제품 경험과 고객 여정을 빠르게 바꾸고 있는 지금, 기업의 리더십은 더 빠르고 정교한 의사결정을 요구받고 있습니다.",
      "이번 프라이빗 디너는 삼성 그룹의 주요 리더를 모시고, AI 시대의 데이터 활용 방식과 제품 인텔리전스의 진화 방향을 함께 논의하기 위해 마련되었습니다.",
      "단순한 트렌드 공유를 넘어, 실제 비즈니스 의사결정에 연결되는 인사이트를 공유합니다.",
    ],
  },

  keyMessages: [
    {
      title: "AI 기반 의사결정",
      description:
        "복잡한 데이터를 더 빠르게 해석하고, 실행 가능한 인사이트로 전환하는 방법을 살펴봅니다.",
    },
    {
      title: "Product Intelligence",
      description:
        "고객 행동 데이터를 기반으로 제품 경험을 개선하고, 성장 기회를 발견하는 방식을 공유합니다.",
    },
    {
      title: "Executive Networking",
      description:
        "삼성 그룹 주요 리더들과 함께 AI 시대의 변화와 실행 전략을 논의하는 프라이빗 네트워킹을 제공합니다.",
    },
  ],

  agenda: [
    {
      order: "01",
      title: "Reception",
      time: "18:00 - 18:30",
      description: "참석자 등록 및 웰컴 네트워킹",
      highlight: false,
    },
    {
      order: "02",
      title: "Opening",
      time: "18:30 - 18:40",
      description: "행사 소개 및 오프닝 메시지",
      highlight: false,
    },
    {
      order: "03",
      title: "Keynote",
      time: "18:40 - 19:20",
      description: "AI 시대의 Product Intelligence와 데이터 기반 의사결정",
      highlight: true,
    },
    {
      order: "04",
      title: "Dinner & Discussion",
      time: "19:20 - 20:30",
      description: "프라이빗 디너와 테이블별 인사이트 공유",
      highlight: false,
    },
    {
      order: "05",
      title: "Networking",
      time: "20:30 - 21:30",
      description: "참석자 네트워킹 및 클로징",
      highlight: false,
    },
  ],

  venue: {
    address: "행사 장소는 참석 확정자에 한해 별도 안내드립니다.",
    description:
      "프라이빗한 대화에 어울리는 프리미엄 공간에서 진행됩니다. 자세한 장소는 참석 확정 후 개별 안내드립니다.",
    // TODO: 구글맵에서 "공유 > 지도 퍼가기(embed a map)"로 얻은 iframe src URL을 넣으세요.
    mapEmbedUrl: null,
    // TODO: 실제 장소 이미지 제공 시 /public/images/venue/1.jpg 등으로 추가하고 src를 채우세요.
    images: [
      { src: null, alt: "행사 장소 이미지 1" },
      { src: null, alt: "행사 장소 이미지 2" },
      { src: null, alt: "행사 장소 이미지 3" },
    ],
  },

  registration: {
    heading: "참가 등록",
    description: "신청 정보를 제출해주시면 확인 후 개별 안내드리겠습니다.",
    privacyConsentLabel:
      "행사 운영 및 참석 안내를 위해 입력하신 개인정보를 수집 및 이용하는 데 동의합니다.",
    privacyPolicyLinkLabel: "자세히 보기",
    successMessage: "참가 신청이 완료되었습니다. 확인 후 개별 안내드리겠습니다.",
    errorMessage: "신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  },

  // 이 행사 전용 Google Apps Script Web App URL (google-apps-script/README.md 참고)
  gasWebAppUrl: process.env.NEXT_PUBLIC_GAS_WEB_APP_URL_SAMSUNG_EXECUTIVE_DINNER,

  footer: {
    brandName: "EXECUTIVE DINNER for SAMSUNG",
    copyright: "© 2026 Martinee io. All rights reserved.",
    privacyPolicyUrl: "https://martinee.notion.site/7cab6d3779c546fc801f79415646c03c",
  },

  seo: {
    description:
      "삼성 그룹 리더를 위한 프라이빗 Executive Dinner. AI 시대의 데이터 기반 의사결정과 Product Intelligence 전략을 함께 논의합니다.",
    ogTitle: "Executive Dinner for SAMSUNG",
    ogDescription:
      "삼성 그룹을 위한 프라이빗 인사이트 세션. AI 시대의 데이터 활용과 제품 인텔리전스 전략을 함께 논의합니다.",
  },
} satisfies EventConfig;
