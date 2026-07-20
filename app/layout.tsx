import type { Metadata } from "next";
import { pretendard, hankenGrotesk, inter } from "./fonts";
import { eventConfig } from "@/config/event";
import "./globals.css";

export const metadata: Metadata = {
  // TODO: 실제 배포 도메인이 정해지면 NEXT_PUBLIC_SITE_URL 환경변수로 설정
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: `${eventConfig.title} | Martinee`,
  description: eventConfig.seo.description,
  openGraph: {
    title: eventConfig.seo.ogTitle,
    description: eventConfig.seo.ogDescription,
    type: "website",
    // TODO: 실제 OG 이미지 제공 시 /public/images/og-image.jpg 로 교체
    images: [{ url: "/images/og-placeholder.svg" }],
  },
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
