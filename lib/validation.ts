import { z } from "zod";

// 한국 휴대폰 번호 형식(하이픈 유무 모두 허용): 010-1234-5678 또는 01012345678
const KOREAN_PHONE_REGEX = /^01[0-9]-?\d{3,4}-?\d{4}$/;

export const registrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "이름을 입력해주세요.")
    .min(2, "이름을 2자 이상 입력해주세요."),
  company: z.string().trim().min(1, "회사명을 입력해주세요."),
  department: z.string().trim().min(1, "부서를 입력해주세요."),
  jobTitle: z.string().trim().min(1, "직책을 입력해주세요."),
  email: z
    .string()
    .trim()
    .min(1, "이메일을 입력해주세요.")
    .email("이메일 형식을 확인해주세요."),
  phone: z
    .string()
    .trim()
    .min(1, "휴대폰 번호를 입력해주세요.")
    .regex(KOREAN_PHONE_REGEX, "휴대폰 번호 형식을 확인해주세요."),
  dietaryRestrictions: z.string().trim().optional(),
  message: z.string().trim().optional(),
  privacyConsent: z.literal(true, {
    error: "개인정보 수집 및 이용에 동의해주세요.",
  }),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
