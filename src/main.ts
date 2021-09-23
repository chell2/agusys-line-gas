// スクリプトプロパティを読込
// LINE Messaging APIのチャネルアクセストークン、画像保存フォルダID、スプレッドシートID
const prop = PropertiesService.getScriptProperties().getProperties();
const CHANNEL_ACCESS_TOKEN = prop.CHANNEL_ACCESS_TOKEN;
const GOOGLE_DRIVE_FOLDER_ID = prop.GOOGLE_DRIVE_FOLDER_ID;
// const GOOGLE_DRIVE_FOLDER_ID_D = prop.GOOGLE_DRIVE_FOLDER_ID_D;
// const GOOGLE_DRIVE_FOLDER_ID_R = prop.GOOGLE_DRIVE_FOLDER_ID_R;
const SPREADSHEET_ID = prop.SPREADSHEET_ID;

// HTTPリクエスト（エンドポイント）
const REPLY_END_POINT = "https://api.line.me/v2/bot/message/reply";
const CONTENT_URL = "https://api-data.line.me/v2/bot/message/";
const LINE_ENDPOINT_PROFILE = "https://api.line.me/v2/bot/profile";

/*
 * POSTリクエスト受信
 * e：受信リクエスト（文字列）
 */
function doPost(e: { postData: { contents: string } }) {
    // eがundefinedの場合動作を終了する
    if (typeof e === "undefined") {
        Logger.log("undefined");
        return;
    }

    // eをJSONとして解析
    var receiveJSON = JSON.parse(e.postData.contents);

    for (var i = 0; i < receiveJSON.events.length; i++) {
        var event = receiveJSON.events[i];
        // 応答トークンとユーザーID
        var replyToken = event.replyToken;
        var userID = event.source.userId;
        var timeStamp = event.timestamp;

        // Webhookイベントタイプによる分岐
        if (event.type == "message") {
            //// メッセージ受信の場合
            var messageId = event.message.id;
            var messageType = event.message.type;
            // メッセージタイプによる分岐
            switch (messageType) {
                //// テキストメッセージの場合
                case "text":
                    // テキスト内容別の処理
                    // テキストメッセージ取得
                    var postText = event.message.text;
                    switch (postText) {
                        case "被災状況の報告":
                            var replyButtons = createButtonsDamaged();
                            replyMessage(replyToken, replyButtons);
                            break;
                        case "復旧後の確認":
                            var replyButtons = createButtonsRestoration();
                            replyMessage(replyToken, replyButtons);
                            break;
                        case "あぐしす":
                            var messages = createSticker();
                            replyMessage(replyToken, messages);
                            break;
                        default:
                            var replyText =
                                createMessage("メニューを選んでください");
                            replyMessage(replyToken, replyText);
                    }
                    break;
                case "location":
                    //位置情報（タイトル・住所・緯度・軽度）を取得
                    var title = event.message.title;
                    var address = event.message.address;
                    var latitude = event.message.latitude;
                    var longitude = event.message.longitude;
                    recordLocation(
                        replyToken,
                        title,
                        address,
                        latitude,
                        longitude
                    );
                    break;
                case "image":
                case "video":
                    var CONTENT_END_POINT =
                        CONTENT_URL + messageId + "/content";
                    getImage(CONTENT_END_POINT, replyToken, userID, timeStamp);
                    break;
                default:
            }
        } else {
            var replyText = createMessage("メニューを選んでください");
            replyMessage(replyToken, replyText);
        }
    }
}
