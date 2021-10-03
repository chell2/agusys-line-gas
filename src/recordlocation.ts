/**
 * 位置情報の処理
 */
function recordLocation(
    replyToken: string,
    timeStamp: number,
    postText: string
) {
    try {
        // テキストの処理
        var geocode = postText
            .replace("緯度:", "")
            .replace("経度:", "")
            .split(/\n/);
        var date = Utilities.formatDate(
            new Date(timeStamp),
            "Asia/Tokyo",
            "yyyy/MM/dd HH:mm"
        );
        // スプレッドシートに記録
        SpreadsheetApp.openById(SPREADSHEET_ID)
            .getSheetByName("location")
            ?.appendRow([date, geocode].flat());
        // メッセージを返す
        var successMessage = createMessage("農地情報を記録しました");
        replyMessage(replyToken, successMessage);
    } catch (error) {
        //例外エラーが起きた時にログを残す
        Logger.log(error);
        // メッセージを返す
        var errorMessage = createMessage("農地情報を記録できませんでした");
        replyMessage(replyToken, errorMessage);
    }
}
