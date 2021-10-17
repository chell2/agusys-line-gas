// .envの読込み
const prop = PropertiesService.getScriptProperties().getProperties();
const CHANNEL_ACCESS_TOKEN = prop.CHANNEL_ACCESS_TOKEN;
const GOOGLE_DRIVE_FOLDER_ID = prop.GOOGLE_DRIVE_FOLDER_ID;
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
const titleUrl =
  "https://github.com/chell2/agusys-line-gas/blob/main/img/buttontitle/";
const DRlocationTitle = titleUrl + "1.png?raw=true";
const RClocationTitle = titleUrl + "2.png?raw=true";
const DRinputTitle = titleUrl + "3.png?raw=true";
const RCinputTitle = titleUrl + "4.png?raw=true";
const DRphotoTitle = titleUrl + "5.png?raw=true";
const RCphotoTitle = titleUrl + "6.png?raw=true";

// e:受信リクエスト
function doPost(e: { postData: { contents: string } }) {
  if (typeof e === "undefined") {
    Logger.log("undefined");
    return;
  }
  const receiveJSON = JSON.parse(e.postData.contents);

  for (let i = 0; i < receiveJSON.events.length; i++) {
    const event = receiveJSON.events[i];
    const replyToken = event.replyToken;
    const timeStamp = event.timestamp;
    const userID = event.source.userId;

    if (event.type == "message") {
      const messageId = event.message.id;
      const messageType = event.message.type;
      switch (messageType) {
        case "text":
          const postText = event.message.text;
          if (~postText.indexOf("緯度")) {
            // DR1-3,RC1-3
            recordLocation(replyToken, timeStamp, postText);
          } else {
            switch (postText) {
              case DR: // DR1-1
                const DRlocationButton = createLocationButton(
                  DR,
                  DRlocationTitle
                );
                replyMessage(replyToken, DRlocationButton);
                break;
              case RC: // RC1-1
                const RClocationButton = createLocationButton(
                  RC,
                  RClocationTitle
                );
                replyMessage(replyToken, RClocationButton);
                break;
              case "次の操作に進む\n>>被災写真": // DR3-1
                const DRphotoButton = createPhotoButton(DR, DRphotoTitle);
                replyMessage(replyToken, DRphotoButton);
                break;
              case "次の操作に進む\n>>復旧写真": // RC3-1
                const RCphotoButton = createPhotoButton(RC, RCphotoTitle);
                replyMessage(replyToken, RCphotoButton);
                break;
              case "いいえ":
                const endMessage = createTextMessage(
                  "記録を終わります\nおつかれさまでした！"
                );
                replyMessage(replyToken, endMessage);
                break;
              case "あぐしす":
                const sticker = createSticker();
                replyMessage(replyToken, sticker);
                break;
              default:
                const defaultText =
                  createTextMessage("メニューを選んでください");
                replyMessage(replyToken, defaultText);
            }
          }
          break;
        case "location": // DR1-2,RC1-2
          const latitude = event.message.latitude;
          const longitude = event.message.longitude;
          mapSearch(replyToken, latitude, longitude);
          break;
        case "image": // 報告手順(2)-2
        case "video":
          const CONTENT_END_POINT = CONTENT_URL + messageId + "/content";
          getImage(CONTENT_END_POINT, replyToken, userID, timeStamp);
          break;
      }
    } else {
      return;
    }
  }
}
