"use client";

import { ChevronLeft, ChevronRight, ImageOff, MapPin } from "lucide-react";
import { useRef } from "react";
import { eventConfig } from "@/config/event";
import { MotionWrapper } from "./MotionWrapper";

// TODO: 실제 장소 이미지 제공 시 아래 그라디언트 슬라이드를 다음으로 교체:
// <Image src="/images/venue/1.jpg" alt="행사 장소" fill className="object-cover" />
export function VenueSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { venue } = eventConfig;

  function scrollByAmount(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * (el.clientWidth * 0.9), behavior: "smooth" });
  }

  return (
    <section className="overflow-hidden bg-surface-container-low py-16 md:py-24">
      <div className="mx-auto mb-8 flex max-w-[1440px] items-end justify-between px-[20px] md:mb-12 md:px-[64px]">
        <div>
          <h2 className="text-headline-lg text-on-background">{venue.name}</h2>
          <p className="mt-2 text-body-md text-on-surface-variant">
            {venue.description}
          </p>
        </div>
        <div className="hidden gap-4 md:flex">
          <button
            type="button"
            aria-label="이전 이미지"
            onClick={() => scrollByAmount(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant transition-colors hover:bg-surface"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="다음 이미지"
            onClick={() => scrollByAmount(1)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant transition-colors hover:bg-surface"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <MotionWrapper>
        <div
          ref={scrollerRef}
          className="no-scrollbar flex gap-[24px] overflow-x-auto px-[20px] md:px-[64px]"
        >
          {Array.from({ length: venue.imagePlaceholderCount }).map((_, index) => (
            <div
              key={index}
              className="flex min-w-[85vw] shrink-0 snap-center flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-outline-variant/40 bg-gradient-to-br from-primary-container/20 via-surface to-primary/10 md:min-w-[600px]"
              style={{ aspectRatio: "4 / 3" }}
              role="img"
              aria-label={`행사 장소 이미지 ${index + 1} (준비 중)`}
            >
              <ImageOff className="text-outline" size={32} aria-hidden="true" />
              <span className="text-label-md text-outline">이미지 준비 중</span>
            </div>
          ))}
        </div>
      </MotionWrapper>

      <div className="mx-auto mt-8 max-w-[1440px] px-[20px] md:px-[64px]">
        <div className="flex items-center gap-3 text-on-surface-variant">
          <MapPin className="text-primary" size={20} aria-hidden="true" />
          <span className="text-body-md">{venue.address}</span>
        </div>
      </div>
    </section>
  );
}
