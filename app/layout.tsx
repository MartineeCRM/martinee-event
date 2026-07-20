import type { Metadata } from "next";
import { pretendard, hankenGrotesk, inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  // TODO: 실제 배포 도메인이 정해지면 NEXT_PUBLIC_SITE_URL 환경변수로 설정
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Martinee Events",
  description: "Martinee가 주최하는 프라이빗 행사 소개 페이지 모음입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${hankenGrotesk.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-on-background antialiased">
        {children}
      </body>
    </html>
  );
}
