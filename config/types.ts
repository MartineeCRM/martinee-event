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
    // 헤더에 텍스트 대신 로고 이미지를 쓰고 싶을 때 경로 지정. null이면 brandName 텍스트로 표시.
    logoUrl: string | null;
  };

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

  intro: {
    heading: string;
    body: string[];
  };

  keyMessages: {
    title: string;
    description: string;
  }[];

  agendaSection: {
    title: string;
    description: string;
  };

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
    // 주소 클릭 시 이동할 구글맵 링크. null이면 링크 없이 텍스트만 표시.
    mapUrl: string | null;
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
    // 식이 제한/알레르기 입력 필드를 등록폼에 노출할지 여부. 오프라인 식사가 있는 행사만 true.
    showDietaryRestrictions: boolean;
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
