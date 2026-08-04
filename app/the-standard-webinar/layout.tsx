import type { Metadata } from "next";
import "../../the-standard-webinar/app/globals.css";

export const metadata: Metadata = {
  title: "[The Standard] AI 에이전트 시대, 변하지 않는 마케팅의 표준 | Martinee",
  description: "AI 에이전트 시대, 변하지 않는 마케팅의 표준 온라인 웨비나",
};

export default function TheStandardWebinarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
