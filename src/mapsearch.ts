// 位置情報検索とカルーセルのカラム作成

function mapSearch(replyToken: string, latitude: number, longitude: number) {
  const logSheet =
    SpreadsheetApp.openById(SPREADSHEET_PIN_ID).getSheetByName("log");
  try {
    // 候補数取得セルの設定
    logSheet?.getRange(1, 8).setValue("=counta(B:B)-1");
    var expand = 1 / 10000;
    do {
      // 検索範囲の設定
      const latMin = latitude - expand;
      const latMax = latitude + expand;
      const lonMin = longitude - expand;
      const lonMax = longitude + expand;
      logSheet
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
      var countNumber = logSheet?.getRange(1, 8).getValue();
      const choices = logSheet?.getRange("A:C").getValues();
      var farmAddressArr = new Array();
      for (let i = 0; i < countNumber + 1; i++) {
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
    // カラム数上限10,近距離候補から選出
    const x = Math.floor(countNumber / 2) - 4;
    const options = farmAddressArr.splice(x, 10);
    const carouselMessage = createCarouselMessage(options);
    replyMessage(replyToken, carouselMessage);
  } catch (error) {
    const errorMessage = createTextMessage("農地の候補がありません");
    replyMessage(replyToken, errorMessage);
  }
}
