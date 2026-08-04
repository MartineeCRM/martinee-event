import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "[The Standard] AI 에이전트 시대, 변하지 않는 마케팅의 표준",
  description: "AI 에이전트 시대, 변하지 않는 마케팅의 표준 온라인 웨비나",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
