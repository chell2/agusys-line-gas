/**
 * 位置情報の処理
 */
function mapSearch(replyToken: string, latitude: number, longitude: number) {
    try {
        var expand = 1 / 10000;
        SpreadsheetApp.openById(SPREADSHEET_ID)
            .getSheetByName("log")
            ?.getRange(1, 8)
            .setValue("=counta(B:B)-1");
        do {
            var latMin = latitude - expand;
            var latMax = latitude + expand;
            var lonMin = longitude - expand;
            var lonMax = longitude + expand;
            // 緯度経度範囲検索
            SpreadsheetApp.openById(SPREADSHEET_ID)
                .getSheetByName("log")
                ?.getRange(1, 1)
                .setValue(
                    '=QUERY(pindata!A:G,"select * where (C>=' +
                        latMin +
                        " and C<" +
                        latMax +
                        ") and (B>=" +
                        lonMin +
                        " and B<" +
                        lonMax +
                        ')",1)'
                );
            var countNum = SpreadsheetApp.openById(SPREADSHEET_ID)
                .getSheetByName("log")
                ?.getRange(1, 8)
                .getValue();
            // 列の取得
            var values = SpreadsheetApp.openById(SPREADSHEET_ID)
                .getSheetByName("log")
                ?.getRange("A:C")
                .getValues();
            var address = new Array();
            for (var i = 0; i < countNum + 1; i++) {
                if (i >= 1) {
                    // @ts-ignore
                    if (values[i] != null) {
                        // @ts-ignore
                        address.push(values[i]);
                    }
                }
            }
            expand = expand * 2;
        } while (countNum < 10);
        // 近い方から10個
        var x = Math.floor(countNum / 2) - 4;
        var option = address.splice(x, 10);
        // メッセージを返す
        var carouselMessage = createCarousel(option);
        replyMessage(replyToken, carouselMessage);
    } catch (error) {
        //例外エラーが起きた時にログを残す
        Logger.log(error);
        // メッセージを返す
        var errorMessage = createMessage("農地の候補がありません");
        replyMessage(replyToken, errorMessage);
    }
}
