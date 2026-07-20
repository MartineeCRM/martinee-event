# Google Apps Script 배포 안내

참가 신청 폼 데이터를 Google Spreadsheet에 저장하기 위한 배포 절차입니다. **Google 계정 접근이 필요한 단계이므로 아래 과정은 직접 수행해야 합니다.**

이 프로젝트는 여러 행사를 한 저장소에서 관리합니다. **행사마다 별도의 스프레드시트/Apps Script 배포가 필요합니다** — 아래 절차를 행사 하나당 한 번씩 반복하세요.

## 1. 스프레드시트 준비

1. 새 Google Spreadsheet를 만듭니다.
2. 상단 메뉴에서 `확장 프로그램 > Apps Script`를 클릭합니다.
3. 열린 편집기의 기본 `Code.gs` 내용을 이 폴더의 [`Code.gs`](./Code.gs) 내용으로 전체 교체합니다.

## 2. 배포

1. Apps Script 편집기 우측 상단의 `배포 > 새 배포`를 클릭합니다.
2. 유형 선택에서 `웹 앱`을 선택합니다.
3. 다음과 같이 설정합니다.
   - 실행할 사용자: **나**
   - 액세스 권한이 있는 사용자: **모든 사용자**
4. `배포`를 클릭하고 권한을 요청하면 승인합니다.
5. 발급된 **웹 앱 URL**(`https://script.google.com/macros/s/.../exec` 형태)을 복사합니다.

## 3. 프론트엔드 연결

프로젝트 루트의 `.env.local` 파일에, 행사별로 이름이 다른 환경변수로 추가합니다 (`.env.local.example` 참고). 예를 들어 Samsung Executive Dinner라면:

```
NEXT_PUBLIC_GAS_WEB_APP_URL_SAMSUNG_EXECUTIVE_DINNER=YOUR_GAS_WEB_APP_URL_HERE
```

그리고 해당 행사의 `config/events/<행사>.ts` 파일에서 `gasWebAppUrl: process.env.NEXT_PUBLIC_GAS_WEB_APP_URL_<행사슬러그>`로 참조되어 있는지 확인하세요 (새 행사를 추가할 때 직접 이 줄을 넣어야 합니다). 실제 배포 URL을 프론트엔드 코드에 직접 하드코딩하지 마세요.

## 4. 동작 확인

- 브라우저에서 웹 앱 URL로 직접 접속하면 `{"success":true,"message":"Registration endpoint is running"}`이 표시되어야 합니다.
- 실제 폼 제출 테스트 후 스프레드시트에 `Registrations` 시트가 자동 생성되고 행이 추가되는지 확인합니다.

## 5. 코드 수정 후 재배포

`Code.gs`를 수정한 뒤에는 `배포 > 배포 관리 > 수정(연필 아이콘) > 새 버전 > 배포`를 통해 재배포해야 변경사항이 반영됩니다. 웹 앱 URL은 재배포해도 동일하게 유지됩니다.

## 참고: CORS 관련 유의사항

- 프론트엔드는 `Content-Type: text/plain`으로 요청을 보내 브라우저의 CORS Preflight(OPTIONS)를 피합니다. Apps Script 웹앱은 OPTIONS 요청을 기본적으로 처리하지 않기 때문입니다.
- 배포 시 "액세스 권한이 있는 사용자"를 **모든 사용자**로 설정해야 브라우저에서 정상적으로 호출할 수 있습니다.
- 만약 브라우저 콘솔에 CORS 관련 오류가 발생하면서 응답을 읽지 못하는 경우, `lib/submitRegistration.ts`의 fetch를 `mode: 'no-cors'`로 전환하고 응답 본문 대신 요청이 예외 없이 완료됐는지만으로 성공 여부를 낙관적으로 판단하는 방식으로 우회할 수 있습니다. (이 경우 실패 여부를 프론트엔드에서 정확히 알 수 없으므로, 스프레드시트를 주기적으로 확인하는 것을 권장합니다.)

## 보안 참고

- 스프레드시트 공유 권한과 Apps Script 배포 권한을 신중히 설정하세요. 신청자 개인정보(이메일, 휴대폰 번호 등)가 저장되므로 스프레드시트를 불필요하게 공개 공유하지 않도록 주의합니다.
- 웹 앱 URL 자체는 프론트엔드에서 호출되어야 하므로 완전히 비밀로 유지할 수는 없지만, 저장소(Git)에 커밋하지 말고 `.env.local`(gitignore 처리됨)에만 보관하세요.
