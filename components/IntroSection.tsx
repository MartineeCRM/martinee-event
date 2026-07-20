import { Quote } from "lucide-react";
import { eventConfig } from "@/config/event";
import { MotionWrapper } from "./MotionWrapper";

export function IntroSection() {
  const { intro } = eventConfig;

  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-[20px] md:px-[64px]">
        <div className="grid items-start gap-[24px] md:grid-cols-2">
          <MotionWrapper>
            <h2 className="mb-8 text-headline-lg text-primary">
              {intro.heading}
            </h2>
            <div className="space-y-6 text-on-surface-variant">
              {intro.body.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? "text-body-lg leading-relaxed"
                      : "text-body-md leading-relaxed"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.15}>
            <div className="mt-8 rounded-xl border border-outline-variant/30 bg-surface-container-low p-8 md:mt-0">
              <Quote className="mb-4 text-primary" size={32} aria-hidden="true" />
              <blockquote className="text-headline-md italic leading-snug text-on-surface-variant">
                &ldquo;{intro.highlightQuote}&rdquo;
              </blockquote>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
