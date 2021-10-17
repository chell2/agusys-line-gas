/// あぐしすLINEbotスタート！ ///
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
            recordLocation(replyToken, timeStamp, postText);
          } else if (~postText.indexOf("被災写真")) {
            setupFolder(DR);
            const DRphotoButton = createPhotoButton(DR, DRphotoTitle);
            replyMessage(replyToken, DRphotoButton);
          } else if (~postText.indexOf("復旧写真")) {
            setupFolder(RC);
            const RCphotoButton = createPhotoButton(RC, RCphotoTitle);
            replyMessage(replyToken, RCphotoButton);
            break;
          } else {
            switch (postText) {
              case DR:
                const DRlocationButton = createLocationButton(
                  DR,
                  DRlocationTitle
                );
                replyMessage(replyToken, DRlocationButton);
                break;
              case RC:
                const RClocationButton = createLocationButton(
                  RC,
                  RClocationTitle
                );
                replyMessage(replyToken, RClocationButton);
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
        case "location":
          const latitude = event.message.latitude;
          const longitude = event.message.longitude;
          mapSearch(replyToken, latitude, longitude);
          break;
        case "image":
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
