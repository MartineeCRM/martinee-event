"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SectionTitle } from "./SectionTitle";

const QUESTIONS = [
  "AI 에이전트가 고객 여정의 일부를 대신 설계하고 있다는 걸 체감하시나요?",
  "여러 채널의 데이터를 하나의 기준으로 통합해서 보고 계신가요?",
  "캠페인 성과를 실시간으로 확인하고 다음 액션까지 자동화하고 있나요?",
];

export function DiagnosticSection() {
  const [step, setStep] = useState(0);
  const isDone = step >= QUESTIONS.length;

  function answer() {
    setStep((prev) => prev + 1);
  }

  function restart() {
    setStep(0);
  }

  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-[20px]">
        <SectionTitle
          title="우리 팀은 AI 에이전트 시대 마케팅 표준을 갖췄나요?"
          description="3가지 질문에 답하며 우리 팀의 마케팅 표준을 점검해보세요."
        />

        <div className="relative min-h-[220px] overflow-hidden rounded-2xl border border-outline-variant/20 bg-background-alt p-8 md:p-12">
          <AnimatePresence mode="wait">
            {!isDone ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-8 text-center"
              >
                <span className="text-label-md uppercase tracking-widest text-primary">
                  질문 {step + 1} / {QUESTIONS.length}
                </span>
                <p className="text-headline-md text-on-background">
                  {QUESTIONS[step]}
                </p>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={answer}
                    className="rounded-full bg-primary px-8 py-3 text-label-md font-semibold text-on-primary transition-all hover:bg-primary-container active:scale-95"
                  >
                    예
                  </button>
                  <button
                    type="button"
                    onClick={answer}
                    className="rounded-full border border-outline-variant px-8 py-3 text-label-md font-semibold text-on-surface-variant transition-all hover:bg-surface active:scale-95"
                  >
                    아니오
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-6 text-center"
              >
                <p className="text-headline-md text-on-background">
                  지금이 마케팅 표준을 다시 세울 시점입니다.
                </p>
                <p className="text-body-md text-on-surface-variant">
                  [THE STANDARD] 웨비나에서 AppsFlyer · Amplitude · Braze와 함께
                  답을 확인하세요.
                </p>
                <div className="flex gap-4">
                  <a
                    href="#register"
                    className="rounded-full bg-primary px-8 py-3 text-label-md font-semibold text-on-primary transition-all hover:bg-primary-container active:scale-95"
                  >
                    무료 등록하기
                  </a>
                  <button
                    type="button"
                    onClick={restart}
                    className="rounded-full border border-outline-variant px-8 py-3 text-label-md font-semibold text-on-surface-variant transition-all hover:bg-surface active:scale-95"
                  >
                    다시 진단하기
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
