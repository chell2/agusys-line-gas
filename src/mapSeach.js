/**
 * 位置情報の処理
 */
function mapSearch(replyToken, latitude, longitude) {
    try {
        var lat = latitude;
        var lng = longitude;
        var diff = 1 / 1000;
        var latMin = lat - diff;
        var latMax = lat + diff;
        var lngMin = lng - diff;
        var lngMax = lng + diff;
        // 緯度経度範囲検索
        SpreadsheetApp.openById(SPREADSHEET_ID)
            .getSheetByName("log")
            .getRange(1, 1)
            .setValue(
                '=QUERY(pindata!A:G,"select * where (C>=' +
                    latMin +
                    " and C<" +
                    latMax +
                    ") and (B>=" +
                    lngMin +
                    " and B<" +
                    lngMax +
                    ')",1)'
            );
        var numData = SpreadsheetApp.openById(SPREADSHEET_ID)
            .getSheetByName("log")
            .getRange(1, 8)
            .getValue();
        // 列の取得
        var values = SpreadsheetApp.openById(SPREADSHEET_ID)
            .getSheetByName("log")
            .getRange("A:C")
            .getValues();
        var address = new Array();
        for (var i = 0; i < numData + 1; i++) {
            if (i >= 1) {
                if (values[i] != null && values[i] != "") {
                    address.push(values[i]);
                }
            }
        }
        // メッセージを返す
        var carouselMessage = createCarousel(address);
        replyMessage(replyToken, carouselMessage);
    } catch (error) {
        //例外エラーが起きた時にログを残す
        Logger.log(error);
        // メッセージを返す
        var errorMessage = createMessage("農地の候補がありません");
        replyMessage(replyToken, errorMessage);
    }
}
