import { User } from "lucide-react";
import { eventConfig } from "@/config/event";
import { MotionWrapper } from "./MotionWrapper";
import { SectionTitle } from "./SectionTitle";

export function SpeakerSection() {
  const { speakers } = eventConfig;
  const isSingle = speakers.length === 1;

  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-[20px] md:px-[64px]">
        <SectionTitle title="연사 소개" />

        <div
          className={
            isSingle
              ? "mx-auto max-w-md"
              : "grid grid-cols-1 gap-[24px] md:grid-cols-2 lg:grid-cols-3"
          }
        >
          {speakers.map((speaker, index) => (
            <MotionWrapper key={`${speaker.name}-${index}`} delay={index * 0.1}>
              <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low p-8 text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary-container/20">
                  {/* TODO: 실제 연사 사진 제공 시 /public/images/speakers/ 에 추가하고
                      speaker.photoUrl에 next/image로 교체 */}
                  <User className="text-primary" size={40} aria-hidden="true" />
                </div>
                <h3 className="text-headline-md text-on-background">
                  {speaker.name}
                </h3>
                <p className="mt-1 text-body-md text-on-surface-variant">
                  {speaker.jobTitle} · {speaker.company}
                </p>
                <p className="mt-4 text-body-md text-on-surface-variant">
                  {speaker.bio}
                </p>
                <p className="mt-4 text-label-md uppercase tracking-widest text-primary">
                  {speaker.session}
                </p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
