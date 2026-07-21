import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import type { EventConfig } from "@/config/types";

export function HeroSection({ config }: { config: EventConfig }) {
  const hostLogos = config.hero.hostLogos.filter((logo) => logo.logoUrl);

  return (
    <section
      id="top"
      className="relative flex min-h-[85vh] items-end overflow-hidden bg-gradient-to-b from-[#F7F8FF] to-white pb-16 md:pb-24"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-[20px] md:px-[64px]">
        <div className="max-w-3xl">
          {config.hero.titleImageUrl ? (
            <h1 className="mb-8">
              {/* TODO: 실제 이미지 비율에 맞게 width/height 조정 */}
              <Image
                src={config.hero.titleImageUrl}
                alt={config.title}
                width={600}
                height={120}
                priority
              />
            </h1>
          ) : (
            <h1 className="mb-8 font-display text-display-mobile leading-none text-on-background md:text-display">
              {config.title}
            </h1>
          )}

          <p className="mb-8 text-body-lg text-on-surface-variant">
            {config.tagline}
          </p>

          <div className="flex flex-col gap-6 md:flex-row md:gap-12">
            <div className="flex items-center gap-3">
              <Calendar className="text-primary" size={20} aria-hidden="true" />
              <span className="text-body-lg text-on-surface-variant">
                {config.date}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-primary" size={20} aria-hidden="true" />
              <span className="text-body-lg text-on-surface-variant">
                {config.location}
              </span>
            </div>
          </div>

          <a
            href="#register"
            className="mt-10 inline-block rounded-full bg-primary px-8 py-4 text-label-md text-on-primary transition-all hover:bg-primary-container active:scale-95"
          >
            {config.ctaLabel}
          </a>

          {hostLogos.length > 0 ? (
            <div className="mt-12 flex flex-wrap items-center gap-8">
              {hostLogos.map((logo) => (
                // TODO: 실제 로고 비율에 맞게 width/height 조정
                <Image
                  key={logo.name}
                  src={logo.logoUrl as string}
                  alt={logo.name}
                  width={120}
                  height={40}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
