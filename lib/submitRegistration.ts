import type { RegistrationFormValues } from "./validation";

export type SubmitRegistrationResult = {
  success: boolean;
  message?: string;
};

// Google Apps Script Web App URL. 값이 없으면 .env.local에 설정이 필요합니다.
// (google-apps-script/README.md 참고)
const GAS_WEB_APP_URL = process.env.NEXT_PUBLIC_GAS_WEB_APP_URL;

export async function submitRegistration(
  values: RegistrationFormValues,
): Promise<SubmitRegistrationResult> {
  if (!GAS_WEB_APP_URL) {
    console.error(
      "NEXT_PUBLIC_GAS_WEB_APP_URL이 설정되지 않았습니다. .env.local을 확인해주세요.",
    );
    return { success: false };
  }

  const payload = {
    ...values,
    submittedAt: new Date().toISOString(),
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
  };

  try {
    // Content-Type을 text/plain으로 보내야 브라우저가 CORS preflight(OPTIONS)를
    // 생략합니다. Apps Script 웹앱은 OPTIONS 요청을 기본적으로 처리하지 않으므로,
    // application/json을 쓰면 프리플라이트에서 요청이 막힙니다.
    const response = await fetch(GAS_WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { success: false };
    }

    const data = await response.json();
    return { success: Boolean(data.success), message: data.message };
  } catch (error) {
    console.error("Registration submission failed", error);
    return { success: false };
  }
}
