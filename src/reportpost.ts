// 入力フォームからスプレッドシートに記録

function textOut(obj: any) {
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(JSON.stringify(obj));
  return output;
}

function reportPost(e: any) {
  var reportSheet =
    SpreadsheetApp.openById(SPREADSHEET_FARM_ID).getSheetByName("farmland");
  const lastRow = reportSheet!.getLastRow();
  const postArray = [
    e.parameter.crop_name,
    e.parameter.contents,
    e.parameter.memo,
  ];
  reportSheet
    ?.getRange(lastRow, 7, 1, postArray[0].length)
    .setValues(postArray);
  return textOut("記録しました！");
}

// // スプレッドシートのデータをパースしてwebサイトにレスポンスする処理
// function reportGet(e: any) {
//   // POSTされたことをログに出力する
//   Logger.log("GET_Requested");
//   // スプレッドシート「データベース」からデータを取得する
//   let Sheet_Data = SpreadsheetApp.getActiveSheet().getDataRange().getValues();
//   // 検索文字の数をカウントするための変数を定義
//   let Counter = 0;
//   // returnで返すテキストを格納する変数の定義
//   let Response_txt = "param1=" + e.parameter.get_param1 + ":";
//   // get_param1に格納された文字を検索するためのループ
//   for (let i = 1; i < Sheet_Data.length; i++) {
//     // もしGETのクエリで与えられた文字と検索対象の文字が一致していたらカウントする
//     if (e.parameter.get_param1 == Sheet_Data[i][1]) {
//       Counter++;
//     }
//   }
//   Response_txt += Counter + " / ";
//   Counter = 0;
//   Response_txt += "param2=" + e.parameter.get_param2 + ":";
//   // get_param2に格納された文字を検索するためのループ
//   for (let i = 1; i < Sheet_Data.length; i++) {
//     if (e.parameter.get_param2 == Sheet_Data[i][2]) {
//       // もしGETのクエリで与えられた文字と検索対象の文字が一致していたらカウントする
//       Counter++;
//     }
//   }
//   Response_txt += Counter + " / ";
//   Counter = 0;
//   Response_txt += "param3=" + e.parameter.get_param3 + ":";
//   // get_param3に格納された文字を検索するためのループ
//   for (let i = 1; i < Sheet_Data.length; i++) {
//     if (e.parameter.get_param3 == Sheet_Data[i][3]) {
//       // もしGETのクエリで与えられた文字と検索対象の文字が一致していたらカウントする
//       Counter++;
//     }
//   }
//   Response_txt += Counter + " / ";
//   Counter = 0;
//   Response_txt += "param4=" + e.parameter.get_param4 + ":";
//   // get_param4に格納された文字を検索するためのループ
//   for (let i = 1; i < Sheet_Data.length; i++) {
//     if (e.parameter.get_param4 == Sheet_Data[i][4]) {
//       // もしGETのクエリで与えられた文字と検索対象の文字が一致していたらカウントする
//       Counter++;
//     }
//   }
//   Response_txt += Counter;
//   return obj2txtout(Response_txt);
// }
