/*
 * 画像・動画を取得（Blob形式）
 */
function getImage(
    CONTENT_END_POINT: any,
    replyToken: string,
    userID: string,
    timeStamp: number
) {
    // timeStampの処理
    var date = Utilities.formatDate(
        new Date(timeStamp),
        "Asia/Tokyo",
        "yyyyMMddHHmm"
    );
    try {
        var res = UrlFetchApp.fetch(CONTENT_END_POINT, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
            },
            method: "get",
        });
        // Blob形式で画像・動画を取得し、ファイル名を設定する
        // ファイル名: timestamp（ミリ秒）ユーザーID（最初の8文字）_応答トークン（最初の8文字）:同時送信に対応
        var imageBlob = res
            .getBlob()
            .setName(
                date + "_" + userID.slice(1, 6) + "_" + replyToken.slice(0, 8)
            );
        // 変数imageBlobとreplyTokenを関数saveImageに渡し、saveImageを起動する
        saveImage(imageBlob, replyToken);
    } catch (error) {
        // 例外エラーが起きた時にログを残す
        Logger.log(error);
        var errorText = createMessage("ファイルを取得できませんでした");
        replyMessage(replyToken, errorText);
    }
}

/*
 * 画像・動画をGoogle Driveに保存
 */
function saveImage(imageBlob: any, replyToken: string) {
    try {
        var folder = DriveApp.getFolderById(GOOGLE_DRIVE_FOLDER_ID);
        folder.createFile(imageBlob);
        var saveText = createMessage("ファイルを保存しました");
        replyMessage(replyToken, saveText);
    } catch (error) {
        // 例外エラーが起きた時にログを残す
        Logger.log(error);
        var errorText = createMessage("ファイルを保存できませんでした");
        replyMessage(replyToken, errorText);
    }
}
