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
    SpreadsheetApp.openById(SPREADSHEET_ID)
      .getSheetByName("location")
      ?.appendRow([date, geocode].flat());
    var successMessage = createTextMessage("農地情報を記録しました");
    replyMessage(replyToken, successMessage);
  } catch (error) {
    var errorMessage = createTextMessage("農地情報を記録できませんでした");
    replyMessage(replyToken, errorMessage);
  }
}
