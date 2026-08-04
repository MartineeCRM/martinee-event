"use client";

import { useEffect, useState } from "react";

type CountdownTimerProps = {
  targetDate: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(targetDate: string): TimeLeft | null {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  // undefined = not yet computed (same on server and first client render, before hydration)
  // null = computed, but the target date has passed
  // TimeLeft = computed, live countdown
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null | undefined>(
    undefined
  );

  useEffect(() => {
    // Schedule the first tick asynchronously (rather than calling setState
    // synchronously in the effect body) to avoid cascading renders — see
    // react-hooks/set-state-in-effect. This still resolves on the next
    // microtask/macrotask turn, well before the user notices.
    const tick = () => setTimeLeft(getTimeLeft(targetDate));
    const initial = setTimeout(tick, 0);
    const interval = setInterval(tick, 1000);
    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, [targetDate]);

  if (timeLeft === undefined) {
    // Same markup on server and on first client render, before hydration —
    // avoids a hydration mismatch. Swapped for the real value once the
    // interval above ticks for the first time.
    return (
      <div
        className="mt-10 grid grid-cols-4 gap-3 md:flex md:gap-4"
        aria-hidden="true"
      >
        {["일", "시간", "분", "초"].map((label) => (
          <div
            key={label}
            className="flex flex-col items-center rounded-xl border border-outline-variant/30 bg-surface px-3 py-3 md:px-5 md:py-4"
          >
            <span className="text-headline-md font-bold text-primary md:text-headline-lg">
              --
            </span>
            <span className="text-label-sm text-on-surface-variant">
              {label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft === null) {
    return (
      <p className="mt-10 text-body-md text-on-surface-variant">
        웨비나 당일입니다. 등록해주시면 참여 링크를 안내드립니다.
      </p>
    );
  }

  const units: { label: string; value: number }[] = [
    { label: "일", value: timeLeft.days },
    { label: "시간", value: timeLeft.hours },
    { label: "분", value: timeLeft.minutes },
    { label: "초", value: timeLeft.seconds },
  ];

  return (
    <div className="mt-10 grid grid-cols-4 gap-3 md:flex md:gap-4">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center rounded-xl border border-outline-variant/30 bg-surface px-3 py-3 md:px-5 md:py-4"
        >
          <span className="text-headline-md font-bold text-primary md:text-headline-lg">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-label-sm text-on-surface-variant">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
