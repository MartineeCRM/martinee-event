"use client";

import { Gem } from "lucide-react";
import { eventConfig } from "@/config/event";
import { useScrollDirection } from "@/hooks/useScrollDirection";

export function Header() {
  const { hidden, scrolled } = useScrollDirection();

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-outline-variant/30 bg-surface/80 backdrop-blur-md transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "shadow-md" : ""}`}
    >
      <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-[20px] md:px-[64px]">
        <a
          href="#top"
          className="flex min-w-0 items-center gap-2"
          aria-label="페이지 상단으로 이동"
        >
          <Gem className="shrink-0 text-primary" size={20} aria-hidden="true" />
          <span className="truncate whitespace-nowrap font-display text-label-md font-bold tracking-tight text-primary md:text-headline-md">
            {eventConfig.nav.brandName}
          </span>
        </a>
        <a
          href="#register"
          className="shrink-0 whitespace-nowrap rounded-full bg-primary px-4 py-2 text-label-sm text-on-primary transition-all hover:bg-primary-container active:scale-95 md:px-6 md:py-2 md:text-label-md"
          aria-label="참가 신청 섹션으로 이동"
        >
          {eventConfig.ctaLabel}
        </a>
      </nav>
    </header>
  );
}
