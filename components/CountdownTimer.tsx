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
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    getTimeLeft(targetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft === null) {
    return (
      <p className="mt-10 text-body-md text-on-surface-variant">
        웨비나가 곧 시작되거나 이미 진행되었습니다.
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
