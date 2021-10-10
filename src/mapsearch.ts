// 位置情報検索,カルーセルテンプレートのカラム作成

function mapSearch(replyToken: string, latitude: number, longitude: number) {
  try {
    // 候補数取得セルの設定
    SpreadsheetApp.openById(SPREADSHEET_ID)
      .getSheetByName("log")
      ?.getRange(1, 8)
      .setValue("=counta(B:B)-1");
    var expand = 1 / 10000;
    do {
      // 検索範囲の設定
      var latMin = latitude - expand;
      var latMax = latitude + expand;
      var lonMin = longitude - expand;
      var lonMax = longitude + expand;
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
      var countNumber = SpreadsheetApp.openById(SPREADSHEET_ID)
        .getSheetByName("log")
        ?.getRange(1, 8)
        .getValue();
      var choices = SpreadsheetApp.openById(SPREADSHEET_ID)
        .getSheetByName("log")
        ?.getRange("A:C")
        .getValues();
      var farmAddressArr = new Array();
      for (var i = 0; i < countNumber + 1; i++) {
        if (i >= 1) {
          // @ts-ignore
          if (choices[i] != null) {
            // @ts-ignore
            farmAddressArr.push(choices[i]);
          }
        }
      }
      // 検索範囲の拡大
      expand = expand * 2;
    } while (countNumber < 10);
    // カラム数上限10:近距離候補から選出
    var x = Math.floor(countNumber / 2) - 4;
    var options = farmAddressArr.splice(x, 10);
    var carouselMessage = createCarouselMessage(options);
    replyMessage(replyToken, carouselMessage);
  } catch (error) {
    var errorMessage = createTextMessage("農地の候補がありません");
    replyMessage(replyToken, errorMessage);
  }
}
