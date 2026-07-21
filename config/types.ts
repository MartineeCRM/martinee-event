// 여러 행사가 공유하는 config 형태. 새 행사를 추가할 때 이 타입에 맞춰
// config/events/ 아래에 파일을 하나 추가하면 됩니다.
export interface EventConfig {
  title: string;
  tagline: string;
  date: string;
  location: string;
  host: string[];
  contactEmail: string;
  ctaLabel: string;

  nav: {
    brandName: string;
  };

  hero: {
    // 행사명을 이미지(로고/워드마크)로 대체하고 싶을 때 경로 지정. null이면 텍스트로 표시.
    titleImageUrl: string | null;
    // 주최사 로고. logoUrl이 있는 항목만 Hero에 표시됩니다.
    hostLogos: { name: string; logoUrl: string | null }[];
  };

  intro: {
    heading: string;
    body: string[];
  };

  keyMessages: {
    title: string;
    description: string;
  }[];

  agenda: {
    order: string;
    title: string;
    time: string;
    description: string;
    highlight: boolean;
  }[];

  venue: {
    address: string;
    description: string;
    // 구글맵 "지도 공유 > 지도 퍼가기"에서 얻은 iframe src URL. null이면 지도 미표시.
    mapEmbedUrl: string | null;
    // src가 null이면 "이미지 준비 중" placeholder로 표시됩니다.
    images: { src: string | null; alt: string }[];
  };

  registration: {
    heading: string;
    description: string;
    privacyConsentLabel: string;
    privacyPolicyLinkLabel: string;
    successMessage: string;
    errorMessage: string;
  };

  // Google Apps Script Web App URL. 행사마다 별도로 배포하고 별도의 환경변수로 관리합니다.
  // (google-apps-script/README.md 참고)
  gasWebAppUrl: string | undefined;

  footer: {
    brandName: string;
    copyright: string;
    privacyPolicyUrl: string;
  };

  seo: {
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
}
