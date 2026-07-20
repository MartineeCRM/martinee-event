// 여러 행사가 공유하는 config 형태. 새 행사를 추가할 때 이 타입에 맞춰
// config/events/ 아래에 파일을 하나 추가하면 됩니다.
export interface EventConfig {
  title: string;
  invitationLabel: string;
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
    backgroundPlaceholder: boolean;
  };

  intro: {
    heading: string;
    body: string[];
    highlightQuote: string;
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
    name: string;
    address: string;
    description: string;
    mapUrl: string | null;
    imagePlaceholderCount: number;
  };

  partners: {
    logos: { name: string; logoUrl: string | null }[];
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
    copyright: string;
    privacyPolicyUrl: string;
  };

  seo: {
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
}
