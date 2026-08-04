// [The Standard] 웨비나 등록 정보를 Google Sheets에 저장합니다.
// 스프레드시트에 연결된 Apps Script에서 사용하세요.

var SHEET_NAME = 'Registrations';
var COLUMNS = [
  '신청일시', '이름', '회사', '부서', '직책', '이메일', '휴대폰 번호',
  '개인정보 동의 여부', 'User Agent', 'Referrer'
];

function getSheet_() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(success, message) {
  return ContentService.createTextOutput(JSON.stringify({ success: success, message: message }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(event) {
  try {
    if (!event || !event.postData || !event.postData.contents) return json_(false, '요청 본문이 없습니다.');

    var data = JSON.parse(event.postData.contents);
    var required = ['name', 'company', 'department', 'position', 'email', 'phone'];
    for (var i = 0; i < required.length; i++) {
      if (!data[required[i]] || !String(data[required[i]]).trim()) return json_(false, '필수 항목이 누락되었습니다.');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return json_(false, '이메일 형식이 올바르지 않습니다.');
    if (!/^01[0-9]-?\d{3,4}-?\d{4}$/.test(data.phone)) return json_(false, '휴대폰 번호 형식이 올바르지 않습니다.');
    if (data.privacyConsent !== true) return json_(false, '개인정보 동의가 필요합니다.');

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      getSheet_().appendRow([
        data.submittedAt ? new Date(data.submittedAt) : new Date(),
        data.name, data.company, data.department, data.position, data.email, data.phone,
        'Y', data.userAgent || '', data.referrer || ''
      ]);
    } finally {
      lock.releaseLock();
    }

    return json_(true, '등록이 완료되었습니다.');
  } catch (error) {
    console.error(error);
    return json_(false, '등록 정보를 저장하지 못했습니다.');
  }
}

function doGet() {
  return json_(true, 'The Standard registration endpoint is running.');
}
