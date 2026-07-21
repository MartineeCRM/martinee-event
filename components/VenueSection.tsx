"use client";

import { ChevronLeft, ChevronRight, ImageOff, MapPin } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import type { EventConfig } from "@/config/types";
import { MotionWrapper } from "./MotionWrapper";

export function VenueSection({ config }: { config: EventConfig }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { venue } = config;

  function scrollByAmount(direction: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * (el.clientWidth * 0.9), behavior: "smooth" });
  }

  return (
    <section className="overflow-hidden bg-surface-container-low py-16 md:py-24">
      <div className="mx-auto mb-8 flex max-w-[1440px] items-end justify-between px-[20px] md:mb-12 md:px-[64px]">
        <div>
          <h2 className="text-headline-lg text-on-background">VENUE</h2>
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
          {venue.images.map((image, index) =>
            image.src ? (
              <div
                key={index}
                className="relative min-w-[85vw] shrink-0 snap-center overflow-hidden rounded-2xl md:min-w-[600px]"
                style={{ aspectRatio: "4 / 3" }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                key={index}
                className="flex min-w-[85vw] shrink-0 snap-center flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-outline-variant/40 bg-gradient-to-br from-primary-container/20 via-surface to-primary/10 md:min-w-[600px]"
                style={{ aspectRatio: "4 / 3" }}
                role="img"
                aria-label={`${image.alt} (준비 중)`}
              >
                <ImageOff className="text-outline" size={32} aria-hidden="true" />
                <span className="text-label-md text-outline">이미지 준비 중</span>
              </div>
            ),
          )}
        </div>
      </MotionWrapper>

      <div className="mx-auto mt-8 max-w-[1440px] px-[20px] md:px-[64px]">
        <div className="mb-6 flex items-center gap-3 text-on-surface-variant">
          <MapPin className="text-primary" size={20} aria-hidden="true" />
          <span className="text-body-md">{venue.address}</span>
        </div>

        {venue.mapEmbedUrl ? (
          <div className="overflow-hidden rounded-2xl border border-outline-variant/40">
            <iframe
              src={venue.mapEmbedUrl}
              className="h-[320px] w-full md:h-[420px]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="행사 장소 지도"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
