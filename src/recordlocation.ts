// 位置情報の記録

function recordLocation(
  replyToken: string,
  timeStamp: number,
  postText: string
) {
  try {
    const geocode = postText
      .replace("緯度:", "")
      .replace("経度:", "")
      .split(/\n/);
    const date = Utilities.formatDate(
      new Date(timeStamp),
      "Asia/Tokyo",
      "yyyy/MM/dd HH:mm"
    );
    const farmSheet =
      SpreadsheetApp.openById(SPREADSHEET_FARM_ID).getSheetByName("farmland");
    const farmId = farmSheet!.getLastRow() + 2101000000;
    farmSheet!.appendRow([farmId, geocode, date].flat());
    var photoButton = createPhotoButton();
    replyMessage(replyToken, photoButton);
  } catch (error) {
    const errorMessage = createTextMessage("農地情報を記録できませんでした");
    replyMessage(replyToken, errorMessage);
  }
}
