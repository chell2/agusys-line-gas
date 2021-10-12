// 写真（動画可）の取得と保存

function getImage(
  CONTENT_END_POINT: any,
  replyToken: string,
  userID: string,
  timeStamp: number
) {
  var date = Utilities.formatDate(
    new Date(timeStamp),
    "Asia/Tokyo",
    "yyyyMMddHHmm"
  );
  try {
    var res = UrlFetchApp.fetch(CONTENT_END_POINT, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
      },
      method: "get",
    });
    // replyTokenの使用により同時送信に対応
    var imageBlob = res
      .getBlob()
      .setName(date + "_" + userID.slice(1, 6) + "_" + replyToken.slice(0, 8));
    saveImage(imageBlob, replyToken);
  } catch (error) {
    var errorText = createTextMessage("ファイルを取得できませんでした");
    replyMessage(replyToken, errorText);
  }
}

function saveImage(imageBlob: any, replyToken: string) {
  try {
    var folder = DriveApp.getFolderById(GOOGLE_DRIVE_FOLDER_ID);
    folder.createFile(imageBlob);
    var confilmTemplate = createConfilmTemplate();
    replyMessage(replyToken, confilmTemplate);
  } catch (error) {
    var errorText = createTextMessage("ファイルを保存できませんでした");
    replyMessage(replyToken, errorText);
  }
}
