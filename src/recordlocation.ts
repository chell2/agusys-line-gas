/**
 * 位置情報の処理
 */
function recordLocation(
    replyToken: string,
    title: string,
    address: string,
    latitude: number,
    longitude: number
) {
    try {
        // 記録するスプレッドシートを指定
        var sheetName = "location";
        var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
        var sheet = spreadsheet.getSheetByName(sheetName);

        // 記録する箇所の列幅を指定
        // var firstColumnSize = 150; // １列目の列幅
        // var secondColumnSize = 150; // ２列目の列幅
        // var thirdColumnSize = 250; // 3列目の列幅
        // var fourthColumnSize = 250; // 4列目の列幅
        // var fifthColumnSize = 250; // 5列目の列幅

        // sheet?.setColumnWidth(1, firstColumnSize);
        // sheet?.setColumnWidth(2, secondColumnSize);
        // sheet?.setColumnWidth(3, thirdColumnSize);
        // sheet?.setColumnWidth(4, fourthColumnSize);
        // sheet?.setColumnWidth(5, fifthColumnSize);

        // 送信された位置情報をスプレッドシートに記録
        sheet?.appendRow([new Date(), title, address, latitude, longitude]);
        // var range = sheet?.getDataRange();
        // range?.setHorizontalAlignment("left"); // 文字を左揃えに統一

        // メッセージを返す
        var successMessage = createMessage("位置情報を記録しました");
        replyMessage(replyToken, successMessage);
    } catch (error) {
        //例外エラーが起きた時にログを残す
        Logger.log(error);
        // メッセージを返す
        var errorMessage = createMessage("位置情報を記録できませんでした");
        replyMessage(replyToken, errorMessage);
    }
}
