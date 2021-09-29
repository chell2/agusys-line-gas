/*
 * LINEの応答（共通）
 * replyToken：応答トークン
 * messages：応答メッセージ
 */
function replyMessage(replyToken, messages) {
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
function createMessage(text) {
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
 * buttonsDamaged：応答メッセージ
 */
function createButtonsDamaged() {
    var buttonsDamaged = [
        {
            type: "template",
            altText: "被災状況の報告",
            template: {
                type: "buttons",
                // thumbnailImageUrl:
                //     "https:",
                // imageAspectRatio: "square",
                // imageSize: "cover",
                // imageBackgroundColor: "#FFFFFF",
                title: "被災状況の報告",
                text: "操作を選択してください\n位置情報を送ると農地の候補を表示します",
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
                        label: "報告内容の入力(未)",
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
 * buttonsRestoration：応答メッセージ
 */
function createButtonsRestoration() {
    var buttonsRestoration = [
        {
            type: "template",
            altText: "復旧後の確認",
            template: {
                type: "buttons",
                // thumbnailImageUrl:
                //     "https:",
                // imageAspectRatio: "square",
                // imageSize: "cover",
                // imageBackgroundColor: "#FFFFFF",
                title: "復旧後の確認",
                text: "操作を選択してください\n位置情報を送ると農地の候補を表示します",
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
                        label: "確認内容の入力(未)",
                        uri: "https://line.me/R/nv/recommendOA/@linedevelopers",
                    },
                ],
            },
        },
    ];
    return buttonsRestoration;
}

/*
 * カルーセルメッセージの生成（位置情報応答）
 * replyToken：応答トークン
 * carouselMessage：応答メッセージ
 */
function createCarousel(address) {
    var carouselMessage = [
        {
            type: "template",
            altText: "報告する農地を選んでください",
            template: {
                type: "carousel",
                columns: [
                    {
                        // "thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=postback", // 画像のURL
                        // "imageBackgroundColor": "#FFFFFF", // 画像の背景色
                        title: address[0][0],
                        text: "この農地について報告しますか？",
                        defaultAction: {
                            type: "uri",
                            label: "場所を確認する",
                            uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                        },
                        actions: [
                            {
                                type: "uri",
                                label: "場所を確認する",
                                uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                            },
                            {
                                type: "message",
                                label: "この農地を選択",
                                text:
                                    address[0][0] +
                                    "\n緯度:" +
                                    address[0][2] +
                                    "\n経度:" +
                                    address[0][1],
                            },
                        ],
                    },
                    {
                        // "thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=message", // 画像のURL
                        // "imageBackgroundColor": "#FFFFFF", // 画像の背景色
                        title: address[1][0],
                        text: "この農地について報告しますか？",
                        defaultAction: {
                            type: "uri",
                            label: "場所を確認する",
                            uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                        },
                        actions: [
                            {
                                type: "uri",
                                label: "場所を確認する",
                                uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                            },
                            {
                                type: "message",
                                label: "この農地を選択",
                                text:
                                    address[1][0] +
                                    "\n緯度:" +
                                    address[1][2] +
                                    "\n経度:" +
                                    address[1][1],
                            },
                        ],
                    },
                    {
                        // "thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=uri", // 画像のURL
                        // "imageBackgroundColor": "#FFFFFF", // 画像の背景色
                        title: address[2][0],
                        text: "この農地について報告しますか？",
                        defaultAction: {
                            type: "uri",
                            label: "場所を確認する",
                            uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                        },
                        actions: [
                            {
                                type: "uri",
                                label: "場所を確認する",
                                uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                            },
                            {
                                type: "message",
                                label: "この農地を選択",
                                text:
                                    address[2][0] +
                                    "\n緯度:" +
                                    address[2][2] +
                                    "\n経度:" +
                                    address[2][1],
                            },
                        ],
                    },
                    {
                        // "thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=uri", // 画像のURL
                        // "imageBackgroundColor": "#FFFFFF", // 画像の背景色
                        title: address[3][0],
                        text: "この農地について報告しますか？",
                        defaultAction: {
                            type: "uri",
                            label: "場所を確認する",
                            uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                        },
                        actions: [
                            {
                                type: "uri",
                                label: "場所を確認する",
                                uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                            },
                            {
                                type: "message",
                                label: "この農地を選択",
                                text:
                                    address[3][0] +
                                    "\n緯度:" +
                                    address[3][2] +
                                    "\n経度:" +
                                    address[3][1],
                            },
                        ],
                    },
                    {
                        // "thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=uri", // 画像のURL
                        // "imageBackgroundColor": "#FFFFFF", // 画像の背景色
                        title: address[4][0],
                        text: "この農地について報告しますか？",
                        defaultAction: {
                            type: "uri",
                            label: "場所を確認する",
                            uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                        },
                        actions: [
                            {
                                type: "uri",
                                label: "場所を確認する",
                                uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                            },
                            {
                                type: "message",
                                label: "この農地を選択",
                                text:
                                    address[4][0] +
                                    "\n緯度:" +
                                    address[4][2] +
                                    "\n経度:" +
                                    address[4][1],
                            },
                        ],
                    },
                    {
                        // "thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=uri", // 画像のURL
                        // "imageBackgroundColor": "#FFFFFF", // 画像の背景色
                        title: address[5][0],
                        text: "この農地について報告しますか？",
                        defaultAction: {
                            type: "uri",
                            label: "場所を確認する",
                            uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                        },
                        actions: [
                            {
                                type: "uri",
                                label: "場所を確認する",
                                uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                            },
                            {
                                type: "message",
                                label: "この農地を選択",
                                text:
                                    address[5][0] +
                                    "\n緯度:" +
                                    address[5][2] +
                                    "\n経度:" +
                                    address[5][1],
                            },
                        ],
                    },
                    {
                        // "thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=uri", // 画像のURL
                        // "imageBackgroundColor": "#FFFFFF", // 画像の背景色
                        title: address[6][0],
                        text: "この農地について報告しますか？",
                        defaultAction: {
                            type: "uri",
                            label: "場所を確認する",
                            uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                        },
                        actions: [
                            {
                                type: "uri",
                                label: "場所を確認する",
                                uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                            },
                            {
                                type: "message",
                                label: "この農地を選択",
                                text:
                                    address[6][0] +
                                    "\n緯度:" +
                                    address[6][2] +
                                    "\n経度:" +
                                    address[6][1],
                            },
                        ],
                    },
                    {
                        // "thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=uri", // 画像のURL
                        // "imageBackgroundColor": "#FFFFFF", // 画像の背景色
                        title: address[7][0],
                        text: "この農地について報告しますか？",
                        defaultAction: {
                            type: "uri",
                            label: "場所を確認する",
                            uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                        },
                        actions: [
                            {
                                type: "uri",
                                label: "場所を確認する",
                                uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                            },
                            {
                                type: "message",
                                label: "この農地を選択",
                                text:
                                    address[7][0] +
                                    "\n緯度:" +
                                    address[7][2] +
                                    "\n経度:" +
                                    address[7][1],
                            },
                        ],
                    },
                    {
                        // "thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=uri", // 画像のURL
                        // "imageBackgroundColor": "#FFFFFF", // 画像の背景色
                        title: address[8][0],
                        text: "この農地について報告しますか？",
                        defaultAction: {
                            type: "uri",
                            label: "場所を確認する",
                            uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                        },
                        actions: [
                            {
                                type: "uri",
                                label: "場所を確認する",
                                uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                            },
                            {
                                type: "message",
                                label: "この農地を選択",
                                text:
                                    address[8][0] +
                                    "\n緯度:" +
                                    address[8][2] +
                                    "\n経度:" +
                                    address[8][1],
                            },
                        ],
                    },
                    {
                        // "thumbnailImageUrl": "https://placehold.jp/640x480.jpg?text=uri", // 画像のURL
                        // "imageBackgroundColor": "#FFFFFF", // 画像の背景色
                        title: address[9][0],
                        text: "この農地について報告しますか？",
                        defaultAction: {
                            type: "uri",
                            label: "場所を確認する",
                            uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                        },
                        actions: [
                            {
                                type: "uri",
                                label: "場所を確認する",
                                uri: "https://www.google.com/maps/d/edit?mid=1v_CsOlVlpnm7okSWUNwXcFq9qsCbnExg&usp=sharing",
                            },
                            {
                                type: "message",
                                label: "この農地を選択",
                                text:
                                    address[9][0] +
                                    "\n緯度:" +
                                    address[9][2] +
                                    "\n経度:" +
                                    address[9][1],
                            },
                        ],
                    },
                ],
                imageAspectRatio: "rectangle",
                imageSize: "cover",
            },
        },
    ];
    return carouselMessage;
}
