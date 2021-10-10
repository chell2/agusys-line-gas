// ボタンメッセージによる報告手順の誘導

function createLocationButton(postText: string) {
  const locationButton = [
    {
      type: "template",
      altText: postText,
      template: {
        type: "buttons",
        title: "（1）位置情報の取得",
        text: "タップして位置情報を送ると\n農地の候補を表示します",
        actions: [
          {
            type: "location",
            label: "位置情報を送る",
          },
        ],
      },
    },
  ];
  return locationButton;
}

function createPhotoButton(postText: string) {
  const photoButton = [
    {
      type: "template",
      altText: postText,
      template: {
        type: "buttons",
        title: "（2）写真の送信",
        text: "現地の状況がわかる写真を送ってください（最大10枚）",
        actions: [
          {
            type: "camera",
            label: "写真を撮る",
          },
          {
            type: "cameraRoll",
            label: "撮影した写真から選ぶ",
          },
        ],
      },
    },
  ];
  return photoButton;
}

function createReportButton(postText: string) {
  const reportButton = [
    {
      type: "template",
      altText: postText,
      template: {
        type: "buttons",
        title: "（3）状況の報告",
        text: "下記をタップ後に送られたメッセージを記録します（1通のみ）",
        actions: [
          {
            type: "text",
            label: postText,
            text: "@" + postText,
          },
        ],
      },
    },
  ];
  return reportButton;
}
