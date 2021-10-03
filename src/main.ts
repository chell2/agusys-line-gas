// スクリプトプロパティを読込
// LINE Messaging APIのチャネルアクセストークン、画像保存フォルダID、スプレッドシートID
var prop = PropertiesService.getScriptProperties().getProperties();
var CHANNEL_ACCESS_TOKEN = prop.CHANNEL_ACCESS_TOKEN;
var GOOGLE_DRIVE_FOLDER_ID = prop.GOOGLE_DRIVE_FOLDER_ID;
// const GOOGLE_DRIVE_FOLDER_ID_D = prop.GOOGLE_DRIVE_FOLDER_ID_D;
// const GOOGLE_DRIVE_FOLDER_ID_R = prop.GOOGLE_DRIVE_FOLDER_ID_R;
var SPREADSHEET_ID = prop.SPREADSHEET_ID;
var SPREADSHEET_PIN_ID = prop.SPREADSHEET_PIN_ID;
// HTTPリクエスト（エンドポイント）
var REPLY_END_POINT = "https://api.line.me/v2/bot/message/reply";
var CONTENT_URL = "https://api-data.line.me/v2/bot/message/";
var LINE_ENDPOINT_PROFILE = "https://api.line.me/v2/bot/profile";
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
                    if (~postText.indexOf("緯度")) {
                        recordLocation(replyToken, timeStamp, postText);
                    } else {
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
                    }
                    break;
                case "location":
                    //位置情報（緯度・経度）を取得
                    var latitude = event.message.latitude;
                    var longitude = event.message.longitude;
                    mapSearch(replyToken, latitude, longitude);
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
