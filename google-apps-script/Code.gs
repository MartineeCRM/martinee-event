// Registration 데이터를 Google Spreadsheet에 저장하는 Apps Script.
// 배포 방법은 이 폴더의 README.md를 참고하세요.

var SHEET_NAME = 'Registrations';

// 스프레드시트에 바인딩된 Apps Script(스프레드시트 > 확장 프로그램 > Apps Script)로
// 사용하는 경우 비워두면 됩니다. 독립 실행형 스크립트로 사용하는 경우에만
// 대상 스프레드시트의 ID를 입력하세요.
var SPREADSHEET_ID = '';

var COLUMNS = [
  '신청일시',
  '이름',
  '회사',
  '부서',
  '직책',
  '이메일',
  '휴대폰 번호',
  '식이 제한 / 알레르기',
  '기타 요청사항',
  '개인정보 동의 여부',
  'User Agent',
  'Referrer',
];

function getSpreadsheet_() {
  return SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
}

function getSheet_() {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(COLUMNS);
  }
  return sheet;
}

function respond_(success, message) {
  return ContentService.createTextOutput(
    JSON.stringify({ success: success, message: message })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return respond_(false, 'Empty request body');
    }

    var data = JSON.parse(e.postData.contents);

    var requiredFields = [
      'name',
      'company',
      'department',
      'jobTitle',
      'email',
      'phone',
    ];
    for (var i = 0; i < requiredFields.length; i++) {
      if (!data[requiredFields[i]]) {
        return respond_(false, 'Missing required field: ' + requiredFields[i]);
      }
    }
    if (data.privacyConsent !== true) {
      return respond_(false, 'Privacy consent is required');
    }

    var sheet = getSheet_();
    sheet.appendRow([
      data.submittedAt ? new Date(data.submittedAt) : new Date(),
      data.name,
      data.company,
      data.department,
      data.jobTitle,
      data.email,
      data.phone,
      data.dietaryRestrictions || '',
      data.message || '',
      data.privacyConsent ? 'Y' : 'N',
      data.userAgent || '',
      data.referrer || '',
    ]);

    return respond_(true, 'Registration submitted successfully');
  } catch (error) {
    return respond_(false, 'Failed to submit registration');
  }
}

// 배포 확인용 상태 체크 (브라우저에서 웹앱 URL로 직접 접속하면 확인 가능)
function doGet() {
  return respond_(true, 'Registration endpoint is running');
}
