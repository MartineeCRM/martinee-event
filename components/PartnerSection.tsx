import type { EventConfig } from "@/config/types";
import { MotionWrapper } from "./MotionWrapper";

// TODO: 실제 로고 제공 시 /public/logos/ 에 추가하고 아래 placeholder div를
// next/image(<Image src={logo.logoUrl} alt={logo.name} />)로 교체
export function PartnerSection({ config }: { config: EventConfig }) {
  const { partners } = config;

  return (
    <section className="bg-background-alt py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-[20px] text-center md:px-[64px]">
        <MotionWrapper>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {partners.logos.map((logo) => (
              <div
                key={logo.name}
                className="flex h-16 w-40 items-center justify-center rounded-lg border border-outline-variant/30 bg-surface text-label-md uppercase tracking-widest text-on-surface-variant"
              >
                {logo.name}
              </div>
            ))}
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
