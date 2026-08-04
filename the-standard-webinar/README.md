# The Standard Webinar

`[The Standard] AI 에이전트 시대, 변하지 않는 마케팅의 표준` 행사 홍보 랜딩페이지입니다.

## 실행

상위 `martinee-event` 프로젝트에서 의존성이 설치되어 있다면 아래 명령으로 실행할 수 있습니다.

```bash
cd the-standard-webinar
npm run dev
```

독립 실행 환경에서는 먼저 `npm install`을 실행해 주세요.

## 수정이 필요한 플레이스홀더

- 연사 이름, 소속, 직책, 소개, 발표 주제
- 세션 시간 및 상세 프로그램
- 주최사 로고
- `app/page.tsx`의 등록 API 연동 TODO

등록 폼은 현재 입력 검증과 완료 화면을 제공하는 데모이며, 개인정보는 저장하지 않습니다.

## 배포 경로

이 프로젝트는 기존 `martinee-event` Next.js 앱의 `/the-standard-webinar` 라우트로 연결되어 있습니다. 기존 앱을 배포하면 해당 경로에서 페이지를 확인할 수 있습니다.
