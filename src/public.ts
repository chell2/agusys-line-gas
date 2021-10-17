// グローバル定数の宣言

// .envの読込み
const prop = PropertiesService.getScriptProperties().getProperties();
const CHANNEL_ACCESS_TOKEN = prop.CHANNEL_ACCESS_TOKEN;
const DRIVE_FOLDER_ID = prop.GOOGLE_DRIVE_FOLDER_ID;
const SPREADSHEET_PIN_ID = prop.SPREADSHEET_PIN_ID;
const SPREADSHEET_FARM_ID = prop.SPREADSHEET_FARM_ID;
const SPREADSHEET_IMG_ID = prop.SPREADSHEET_IMG_ID;

const REPLY_END_POINT = "https://api.line.me/v2/bot/message/reply";
const CONTENT_URL = "https://api-data.line.me/v2/bot/message/";
const LINE_ENDPOINT_PROFILE = "https://api.line.me/v2/bot/profile";

// category
const DR = "被災状況の報告"; // DamageReport
const RC = "復旧後の確認"; // RestorationCheck

// buttonTitleImage
const url =
  "https://github.com/chell2/agusys-line-gas/blob/main/img/buttontitle/";
const DRlocationTitle = url + "1.png?raw=true";
const RClocationTitle = url + "2.png?raw=true";
const DRinputTitle = url + "3.png?raw=true";
const RCinputTitle = url + "4.png?raw=true";
const DRphotoTitle = url + "5.png?raw=true";
const RCphotoTitle = url + "6.png?raw=true";
