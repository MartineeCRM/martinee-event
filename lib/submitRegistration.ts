import type { RegistrationFormValues } from "./validation";

export type SubmitRegistrationResult = {
  success: boolean;
  message?: string;
};

export async function submitRegistration(
  values: RegistrationFormValues,
  gasWebAppUrl: string | undefined,
): Promise<SubmitRegistrationResult> {
  if (!gasWebAppUrl) {
    console.error(
      "이 행사의 GAS Web App URL이 설정되지 않았습니다. .env.local과 config/events의 gasWebAppUrl을 확인해주세요.",
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
    const response = await fetch(gasWebAppUrl, {
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
