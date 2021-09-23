/*
 * LINEの応答（共通）
 * replyToken：応答トークン
 * messages：応答メッセージ
 */
function replyMessage(replyToken: string, messages: object) {
    UrlFetchApp.fetch(REPLY_END_POINT, {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
        },
        method: "post",
        payload: JSON.stringify({
            replyToken: replyToken,
            messages: messages,
        }),
    });
}

/*
 * 文字メッセージの生成
 * replyToken：応答トークン
 * messages：応答メッセージ
 */
function createMessage(text: string) {
    var messages = [
        {
            type: "text",
            text: text,
        },
    ];

    return messages;
}

/*
 * スタンプメッセージの生成
 * replyToken：応答トークン
 * messages：応答メッセージ
 */
function createSticker() {
    var messages = [
        {
            type: "sticker",
            packageId: "789",
            stickerId: "10874",
        },
    ];

    return messages;
}

/*
 * ボタンテンプレートメッセージの生成（被災状況の報告）
 * replyToken：応答トークン
 * messages：応答メッセージ
 */
function createButtonsDamaged(): object {
    var buttonsDamaged = [
        {
            type: "template",
            altText: "This is a buttons template",
            template: {
                type: "buttons",
                // thumbnailImageUrl:
                //     "https:",
                // imageAspectRatio: "square",
                // imageSize: "cover",
                // imageBackgroundColor: "#FFFFFF",
                title: "被災状況の報告",
                text: "操作を選択してください",
                // "defaultAction": {
                //     "type": "uri",
                //     "label": "View detail",
                //     "uri": "http://example.com/page/123"
                // },
                actions: [
                    {
                        type: "location",
                        label: "位置情報を送る",
                    },
                    {
                        type: "camera",
                        label: "写真を撮る",
                    },
                    {
                        type: "cameraRoll",
                        label: "撮影した写真から選ぶ",
                    },
                    {
                        type: "uri",
                        label: "状況報告(仮)",
                        uri: "https://line.me/R/nv/recommendOA/@linedevelopers",
                    },
                ],
            },
        },
    ];
    return buttonsDamaged;
}

/*
 * ボタンテンプレートメッセージの生成（復旧後の確認）
 * replyToken：応答トークン
 * messages：応答メッセージ
 */
function createButtonsRestoration(): object {
    var buttonsRestoration = [
        {
            type: "template",
            altText: "This is a buttons template",
            template: {
                type: "buttons",
                // thumbnailImageUrl:
                //     "https:",
                // imageAspectRatio: "square",
                // imageSize: "cover",
                // imageBackgroundColor: "#FFFFFF",
                title: "復旧後の確認",
                text: "操作を選択してください",
                // "defaultAction": {
                //     "type": "uri",
                //     "label": "View detail",
                //     "uri": "http://example.com/page/123"
                // },
                actions: [
                    {
                        type: "location",
                        label: "位置情報を送る",
                    },
                    {
                        type: "camera",
                        label: "写真を撮る",
                    },
                    {
                        type: "cameraRoll",
                        label: "撮影した写真から選ぶ",
                    },
                    {
                        type: "uri",
                        label: "状況報告(仮)",
                        uri: "https://line.me/R/nv/recommendOA/@linedevelopers",
                    },
                ],
            },
        },
    ];
    return buttonsRestoration;
}
