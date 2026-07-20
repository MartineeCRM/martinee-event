"use client";

import { useEffect, useState } from "react";

export type ScrollState = {
  hidden: boolean;
  scrolled: boolean;
};

export function useScrollDirection(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    hidden: false,
    scrolled: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function onScroll() {
      const currentScrollY = window.scrollY;
      setState({
        hidden: currentScrollY > lastScrollY && currentScrollY > 80,
        scrolled: currentScrollY > 0,
      });
      lastScrollY = currentScrollY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}
