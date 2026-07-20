import { Mic, Sparkles, UtensilsCrossed, Users, Wine } from "lucide-react";
import { eventConfig } from "@/config/event";
import { MotionWrapper } from "./MotionWrapper";
import { SectionTitle } from "./SectionTitle";

const ICONS = [Wine, Sparkles, Mic, UtensilsCrossed, Users];

export function AgendaSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-[20px] md:px-[64px]">
        <SectionTitle
          title="행사 일정"
          description="인사이트와 네트워킹으로 이어지는 저녁의 흐름"
        />

        <div className="grid grid-cols-1 gap-[24px] md:grid-cols-3">
          {eventConfig.agenda.map((item, index) => {
            const Icon = ICONS[index] ?? Users;
            return (
              <MotionWrapper key={item.order} delay={index * 0.08}>
                <div
                  className={`flex h-full min-h-[240px] flex-col justify-between rounded-xl p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${
                    item.highlight
                      ? "bg-primary text-on-primary"
                      : "border border-outline-variant/20 bg-surface"
                  }`}
                >
                  <div>
                    <span
                      className={`text-display-mobile font-bold ${
                        item.highlight ? "text-on-primary/30" : "text-primary/20"
                      }`}
                    >
                      {item.order}
                    </span>
                    <h3 className="mt-4 text-headline-md">{item.title}</h3>
                    <p
                      className={`mt-2 text-body-md ${
                        item.highlight ? "text-on-primary/80" : "text-on-surface-variant"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-label-md uppercase tracking-widest ${
                        item.highlight ? "text-on-primary/80" : "text-on-surface-variant"
                      }`}
                    >
                      {item.time}
                    </span>
                    <Icon aria-hidden="true" size={22} />
                  </div>
                </div>
              </MotionWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
