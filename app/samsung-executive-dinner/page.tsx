import type { Metadata } from "next";
import { AgendaSection } from "@/components/AgendaSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { IntroSection } from "@/components/IntroSection";
import { KeyMessageSection } from "@/components/KeyMessageSection";
import { RegistrationForm } from "@/components/RegistrationForm";
import { VenueSection } from "@/components/VenueSection";
import { eventConfig } from "@/config/events/samsung-executive-dinner";

export const metadata: Metadata = {
  title: `${eventConfig.title} | Martinee`,
  description: eventConfig.seo.description,
  openGraph: {
    title: eventConfig.seo.ogTitle,
    description: eventConfig.seo.ogDescription,
    type: "website",
    // TODO: 실제 OG 이미지 제공 시 /public/images/og-placeholder.svg 를 실제 이미지로 교체
    images: [{ url: "/images/og-placeholder.svg" }],
  },
};

export default function SamsungExecutiveDinnerPage() {
  return (
    <>
      <Header config={eventConfig} />
      <main>
        <HeroSection config={eventConfig} />
        <IntroSection config={eventConfig} />
        <KeyMessageSection config={eventConfig} />
        <AgendaSection config={eventConfig} />
        <VenueSection config={eventConfig} />
        <RegistrationForm config={eventConfig} />
      </main>
      <Footer config={eventConfig} />
    </>
  );
}
