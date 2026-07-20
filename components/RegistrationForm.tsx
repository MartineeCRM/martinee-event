"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { eventConfig } from "@/config/event";
import { submitRegistration } from "@/lib/submitRegistration";
import {
  registrationSchema,
  type RegistrationFormValues,
} from "@/lib/validation";
import { MotionWrapper } from "./MotionWrapper";

type SubmitStatus = "idle" | "success" | "error";

const fieldClass =
  "w-full border-0 border-b border-outline-variant bg-transparent px-0 py-2 text-body-md text-on-background transition-colors focus:border-primary focus:outline-none focus:ring-0";
const labelClass = "text-label-md text-on-surface-variant";
const errorClass = "text-label-sm text-error";

export function RegistrationForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });

  async function onSubmit(values: RegistrationFormValues) {
    setStatus("idle");
    const result = await submitRegistration(values);
    if (result.success) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <section className="bg-background py-16 md:py-24" id="register">
      <div className="mx-auto max-w-3xl px-[20px]">
        <MotionWrapper>
          <div className="rounded-3xl border border-outline-variant/10 bg-surface p-8 shadow-xl shadow-primary/5 md:p-12">
            <div className="mb-12 text-center">
              <h2 className="text-headline-lg text-on-background">
                {eventConfig.registration.heading}
              </h2>
              <p className="mt-2 text-body-md text-on-surface-variant">
                {eventConfig.registration.description}
              </p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="name">
                    이름
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="홍길동"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.name)}
                    {...register("name")}
                  />
                  {errors.name ? (
                    <p className={errorClass}>{errors.name.message}</p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="company">
                    회사
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="삼성전자"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.company)}
                    {...register("company")}
                  />
                  {errors.company ? (
                    <p className={errorClass}>{errors.company.message}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="department">
                    부서
                  </label>
                  <input
                    id="department"
                    type="text"
                    placeholder="Digital Strategy Team"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.department)}
                    {...register("department")}
                  />
                  {errors.department ? (
                    <p className={errorClass}>{errors.department.message}</p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="jobTitle">
                    직책
                  </label>
                  <input
                    id="jobTitle"
                    type="text"
                    placeholder="팀장"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.jobTitle)}
                    {...register("jobTitle")}
                  />
                  {errors.jobTitle ? (
                    <p className={errorClass}>{errors.jobTitle.message}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="email">
                    이메일
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.email)}
                    {...register("email")}
                  />
                  {errors.email ? (
                    <p className={errorClass}>{errors.email.message}</p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelClass} htmlFor="phone">
                    휴대폰 번호
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="010-0000-0000"
                    className={fieldClass}
                    aria-invalid={Boolean(errors.phone)}
                    {...register("phone")}
                  />
                  {errors.phone ? (
                    <p className={errorClass}>{errors.phone.message}</p>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass} htmlFor="dietaryRestrictions">
                  식이 제한 / 알레르기
                </label>
                <input
                  id="dietaryRestrictions"
                  type="text"
                  placeholder="예: 없음, 채식, 특정 알레르기 등"
                  className={fieldClass}
                  {...register("dietaryRestrictions")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass} htmlFor="message">
                  기타 요청사항
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="행사 참석과 관련해 전달할 내용이 있다면 입력해주세요."
                  className={fieldClass}
                  {...register("message")}
                />
              </div>

              <div className="flex items-start gap-4 pt-2">
                <input
                  id="privacyConsent"
                  type="checkbox"
                  className="mt-1 h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary"
                  aria-invalid={Boolean(errors.privacyConsent)}
                  {...register("privacyConsent")}
                />
                <label
                  htmlFor="privacyConsent"
                  className="text-label-sm leading-relaxed text-on-surface-variant"
                >
                  {eventConfig.registration.privacyConsentLabel}
                </label>
              </div>
              {errors.privacyConsent ? (
                <p className={errorClass}>{errors.privacyConsent.message}</p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-primary py-5 text-headline-md text-on-primary transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "제출 중..." : eventConfig.ctaLabel}
              </button>

              {status === "success" ? (
                <p
                  role="status"
                  className="rounded-lg bg-primary/10 px-4 py-3 text-center text-body-md text-primary"
                >
                  {eventConfig.registration.successMessage}
                </p>
              ) : null}
              {status === "error" ? (
                <p
                  role="alert"
                  className="rounded-lg bg-error/10 px-4 py-3 text-center text-body-md text-error"
                >
                  {eventConfig.registration.errorMessage}
                </p>
              ) : null}
            </form>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
