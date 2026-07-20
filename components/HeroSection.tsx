import { Calendar, MapPin } from "lucide-react";
import type { EventConfig } from "@/config/types";

// TODO: 실제 Hero 배경 이미지가 제공되면 아래 그라디언트 div를 다음으로 교체:
// import Image from "next/image";
// <Image src="/images/hero-bg.jpg" alt="행사 배경" fill priority className="object-cover brightness-[0.45]" />
export function HeroSection({ config }: { config: EventConfig }) {
  return (
    <section
      id="top"
      className="relative flex min-h-[85vh] items-end overflow-hidden pb-16 md:pb-24"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-on-background via-primary to-primary-container" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-[20px] md:px-[64px]">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-12 bg-link-blue" />
            <span className="text-label-md uppercase tracking-widest text-link-blue">
              {config.invitationLabel}
            </span>
          </div>

          <h1 className="mb-8 font-display text-display-mobile leading-none text-on-primary md:text-display">
            {config.title}
          </h1>

          <p className="mb-8 text-body-lg text-on-primary/80">
            {config.tagline}
          </p>

          <div className="flex flex-col gap-6 md:flex-row md:gap-12">
            <div className="flex items-center gap-3">
              <Calendar className="text-link-blue" size={20} aria-hidden="true" />
              <span className="text-body-lg text-on-primary/90">
                {config.date}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-link-blue" size={20} aria-hidden="true" />
              <span className="text-body-lg text-on-primary/90">
                {config.location}
              </span>
            </div>
          </div>

          <a
            href="#register"
            className="mt-10 inline-block rounded-full bg-on-primary px-8 py-4 text-label-md text-primary transition-all hover:bg-surface-container active:scale-95"
          >
            {config.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
