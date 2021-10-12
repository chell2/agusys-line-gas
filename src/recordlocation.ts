// 位置情報の記録

function recordLocation(
  replyToken: string,
  timeStamp: number,
  postText: string
) {
  try {
    var geocode = postText
      .replace("緯度:", "")
      .replace("経度:", "")
      .split(/\n/);
    var date = Utilities.formatDate(
      new Date(timeStamp),
      "Asia/Tokyo",
      "yyyy/MM/dd HH:mm"
    );
    var farmSheet =
      SpreadsheetApp.openById(SPREADSHEET_FARM_ID).getSheetByName("farmland");
    var farmId = farmSheet!.getLastRow() + 2101000000;
    farmSheet!.appendRow([farmId, geocode, date].flat());
    var photoButton = createPhotoButton();
    replyMessage(replyToken, photoButton);
  } catch (error) {
    var errorMessage = createTextMessage("農地情報を記録できませんでした");
    replyMessage(replyToken, errorMessage);
  }
}
