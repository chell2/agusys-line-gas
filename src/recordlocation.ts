// 位置情報の記録

// DR1-3,RC1-3
function recordLocation(
  replyToken: string,
  timeStamp: number,
  postText: string
) {
  try {
    const geocode = postText
      .replace("緯度:", "")
      .replace("経度:", "")
      .replace(">>", "")
      .split(/\n/);
    const date = Utilities.formatDate(
      new Date(timeStamp),
      "Asia/Tokyo",
      "yyyy/MM/dd HH:mm"
    );
    const farmSheet =
      SpreadsheetApp.openById(SPREADSHEET_FARM_ID).getSheetByName("farmland");
    const farmId = farmSheet!.getLastRow() + 1021000000;
    farmSheet!.appendRow([farmId, geocode, date].flat());
    if (~postText.indexOf(">>被災報告")) {
      const inputButton = createInputButton(DR, DRinputTitle);
      replyMessage(replyToken, inputButton);
    } else if (~postText.indexOf(">>復旧確認")) {
      const inputButton = createInputButton(RC, RCinputTitle);
      replyMessage(replyToken, inputButton);
    }
  } catch (error) {
    const errorMessage = createTextMessage("農地情報を記録できませんでした");
    replyMessage(replyToken, errorMessage);
  }
}
