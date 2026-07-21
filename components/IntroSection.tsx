import type { EventConfig } from "@/config/types";
import { MotionWrapper } from "./MotionWrapper";

export function IntroSection({ config }: { config: EventConfig }) {
  const { intro } = config;

  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-[20px] md:px-[64px]">
        <MotionWrapper>
          <div className="text-center">
            <h2 className="mb-8 text-headline-lg text-primary">
              {intro.heading}
            </h2>
            <div className="space-y-6 text-on-surface-variant">
              {intro.body.map((paragraph, index) => (
                <p key={index} className="text-body-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
