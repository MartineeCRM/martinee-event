import type { EventConfig } from "@/config/types";
import { MotionWrapper } from "./MotionWrapper";
import { SectionTitle } from "./SectionTitle";

export function KeyMessageSection({ config }: { config: EventConfig }) {
  return (
    <section className="bg-background-alt py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-[20px] md:px-[64px]">
        <SectionTitle title="KEY MESSAGE" />

        <div className="grid grid-cols-1 gap-[24px] md:grid-cols-3">
          {config.keyMessages.map((message, index) => (
            <MotionWrapper key={message.title} delay={index * 0.1}>
              <div className="h-full rounded-xl border border-outline-variant/20 bg-surface p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <h3 className="mb-3 text-headline-md text-on-background">
                  {message.title}
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  {message.description}
                </p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
