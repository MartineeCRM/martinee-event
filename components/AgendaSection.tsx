import type { EventConfig } from "@/config/types";
import { MotionWrapper } from "./MotionWrapper";
import { SectionTitle } from "./SectionTitle";

export function AgendaSection({ config }: { config: EventConfig }) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-[20px] md:px-[64px]">
        <SectionTitle
          title="TIME TABLE"
          description="인사이트와 네트워킹으로 이어지는 저녁의 흐름"
        />

        <div className="flex flex-col divide-y divide-outline-variant/20 overflow-hidden rounded-xl border border-outline-variant/20">
          {config.agenda.map((item, index) => (
            <MotionWrapper key={item.order} delay={index * 0.06}>
              <div
                className={`flex flex-col gap-4 p-6 transition-colors md:flex-row md:items-center md:justify-between md:gap-8 md:p-8 ${
                  item.highlight
                    ? "bg-primary text-on-primary"
                    : "bg-surface text-on-background"
                }`}
              >
                <div className="flex items-center gap-6">
                  <span
                    className={`text-headline-lg font-bold ${
                      item.highlight ? "text-on-primary/40" : "text-primary/25"
                    }`}
                  >
                    {item.order}
                  </span>
                  <div>
                    <h3 className="text-headline-md">{item.title}</h3>
                    <p
                      className={`mt-1 text-body-md ${
                        item.highlight ? "text-on-primary/80" : "text-on-surface-variant"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-label-md uppercase tracking-widest ${
                    item.highlight ? "text-on-primary/80" : "text-on-surface-variant"
                  }`}
                >
                  {item.time}
                </span>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
