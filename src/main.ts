// .envの読込み
const prop = PropertiesService.getScriptProperties().getProperties();
const CHANNEL_ACCESS_TOKEN = prop.CHANNEL_ACCESS_TOKEN;
const GOOGLE_DRIVE_FOLDER_ID = prop.GOOGLE_DRIVE_FOLDER_ID;
const SPREADSHEET_ID = prop.SPREADSHEET_ID;
const SPREADSHEET_PIN_ID = prop.SPREADSHEET_PIN_ID;

const REPLY_END_POINT = "https://api.line.me/v2/bot/message/reply";
const CONTENT_URL = "https://api-data.line.me/v2/bot/message/";
const LINE_ENDPOINT_PROFILE = "https://api.line.me/v2/bot/profile";

// e:受信リクエスト
function doPost(e: { postData: { contents: string } }) {
  if (typeof e === "undefined") {
    Logger.log("undefined");
    return;
  }
  const receiveJSON = JSON.parse(e.postData.contents);

  for (var i = 0; i < receiveJSON.events.length; i++) {
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
            recordLocation(replyToken, timeStamp, postText);
          } else {
            switch (postText) {
              case "被災状況の報告": // 報告手順(1)
              case "復旧後の確認":
                const locationButton = createLocationButton(postText);
                replyMessage(replyToken, locationButton);
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
        case "location": // 報告手順(2)
          const latitude = event.message.latitude;
          const longitude = event.message.longitude;
          mapSearch(replyToken, latitude, longitude);
          break;
        case "image": // 報告手順(3)
        case "video":
          const CONTENT_END_POINT = CONTENT_URL + messageId + "/content";
          getImage(CONTENT_END_POINT, replyToken, userID, timeStamp);
          break;
        default:
          const defaultText = createTextMessage("メニューを選んでください");
          replyMessage(replyToken, defaultText);
      }
    } else {
      const defaultText = createTextMessage("メニューを選んでください");
      replyMessage(replyToken, defaultText);
    }
  }
}
