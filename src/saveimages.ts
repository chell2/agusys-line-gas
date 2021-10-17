// 写真（動画可）の取得と保存、スプレッドシートへの記録

function getImage(
  CONTENT_END_POINT: any,
  replyToken: string,
  userID: string,
  timeStamp: number
) {
  const date = Utilities.formatDate(
    new Date(timeStamp),
    "Asia/Tokyo",
    "yyyyMMddHHmm"
  );
  try {
    const response = UrlFetchApp.fetch(CONTENT_END_POINT, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
      },
      method: "get",
    });
    const imageName =
      date + "_" + userID.slice(1, 6) + "_" + replyToken.slice(0, 8);
    const imageBlob = response.getBlob().setName(imageName);
    saveImage(imageName, imageBlob, replyToken);
  } catch (error) {
    var errorText = createTextMessage("ファイルを取得できませんでした");
    replyMessage(replyToken, errorText);
  }
}

function saveImage(imageName: string, imageBlob: any, replyToken: string) {
  try {
    var folderId = getLastUpdatedFolder()[0];
    var category = getLastUpdatedFolder()[1].slice(-2);
    var folder = DriveApp.getFolderById(folderId);
    var file = folder.createFile(imageBlob);
    recordImage(imageName, file, category, replyToken);
    var confilmTemplate = createConfilmTemplate(category);
    replyMessage(replyToken, confilmTemplate);
  } catch (error) {
    const errorText = createTextMessage("ファイルを保存できませんでした");
    replyMessage(replyToken, errorText);
  }
}

function recordImage(
  imageName: string,
  file: any,
  category: string,
  replyToken: string
) {
  try {
    const folderName = getLastUpdatedFolder()[1];
    if (category == "DR") {
      var str = "被災報告";
    } else if (category == "RC") {
      var str = "復旧確認";
    }
    const farmId = folderName.slice(0, -3);
    const imagesSheet =
      SpreadsheetApp.openById(SPREADSHEET_IMG_ID).getSheetByName("images");
    const imageId = imagesSheet!.getLastRow() + 5021000000;
    imagesSheet?.appendRow([
      farmId,
      str!,
      imageId,
      imageName,
      file.getUrl(),
      file.getId(),
      '=image("https://drive.google.com/uc?id=' + file.getId() + '")',
    ]);
  } catch (error) {
    const errorText = createTextMessage("ファイルを記録できませんでした");
    replyMessage(replyToken, errorText);
  }
}
