/*
 * 画像・動画を取得（Blob形式）
 */
function getImage(CONTENT_END_POINT: any, replyToken: string, userID: string) {
    //ファイル名に使う現在日時をdayjsライブラリで取得
    var date = dayjs.dayjs();
    var formattedDate = date.format("YYYYMMDD_HHmmss");

    try {
        var res = UrlFetchApp.fetch(CONTENT_END_POINT, {
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
            },
            method: "get",
        });

        //Blob形式で画像・動画を取得し、ファイル名を設定する
        //ファイル名: ユーザーID_YYYYMMDD_HHmmss
        var imageBlob = res.getBlob().setName(userID + "_" + formattedDate);

        //変数imageBlobとreplyTokenを関数saveImageに渡し、saveImageを起動する
        saveImage(imageBlob, replyToken);
    } catch (error) {
        //例外エラーが起きた時にログを残す
        Logger.log(error);
        var errorText = createMessage("ファイルを取得できませんでした");
        replyMessage(replyToken, errorText);
    }
}

/*
 * 画像・動画をGoogle Driveに保存
 */
function saveImage(
    imageBlob: GoogleAppsScript.Base.BlobSource,
    replyToken: string
) {
    try {
        var folder = DriveApp.getFolderById(GOOGLE_DRIVE_FOLDER_ID);
        var file = folder.createFile(imageBlob);
        var saveText = createMessage(
            "「" + folder.getName() + "」にファイルを保存しました"
        );
        replyMessage(replyToken, saveText);
    } catch (error) {
        //例外エラーが起きた時にログを残す
        Logger.log(error);
        var errorText = createMessage("ファイルを保存できませんでした");
        replyMessage(replyToken, errorText);
    }
}
