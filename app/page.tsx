import { AgendaSection } from "@/components/AgendaSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { IntroSection } from "@/components/IntroSection";
import { KeyMessageSection } from "@/components/KeyMessageSection";
import { PartnerSection } from "@/components/PartnerSection";
import { RegistrationForm } from "@/components/RegistrationForm";
import { SpeakerSection } from "@/components/SpeakerSection";
import { VenueSection } from "@/components/VenueSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <IntroSection />
        <KeyMessageSection />
        <AgendaSection />
        <SpeakerSection />
        <VenueSection />
        <PartnerSection />
        <RegistrationForm />
      </main>
      <Footer />
    </>
  );
}
