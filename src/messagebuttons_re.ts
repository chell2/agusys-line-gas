// 報告手順の誘導（復旧報告）

var buttonTitleR = "復旧後の確認";

function createLocationButtonRecovery() {
  const defaultAction = {
    type: "location",
    label: "位置情報を送る",
  };
  const locationButtonR = [
    {
      type: "template",
      altText: buttonTitleR + "（1）位置情報を送る",
      template: {
        type: "buttons",
        thumbnailImageUrl:
          "https://github.com/chell2/nodejs-agusys/blob/main/img/2.png?raw=true",
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        imageBackgroundColor: "#03989e",
        text: "タップして位置情報を送信すると、農地の候補を表示します",
        defaultAction: defaultAction,
        actions: [defaultAction],
      },
    },
  ];
  return locationButtonR;
}

function createPhotoButtonRecovery() {
  const defaultAction = {
    type: "camera",
    label: "写真を撮る",
  };
  const photoButtonR = [
    {
      type: "template",
      altText: buttonTitleR + "（2）写真を送る",
      template: {
        type: "buttons",
        thumbnailImageUrl:
          "https://github.com/chell2/nodejs-agusys/blob/main/img/4.png?raw=true",
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        imageBackgroundColor: "#03989e",
        text: "復旧後の施設・機械等がわかる写真を送ってください",
        defaultAction: defaultAction,
        actions: [
          defaultAction,
          {
            type: "cameraRoll",
            label: "撮影した写真から選ぶ",
          },
        ],
      },
    },
  ];
  return photoButtonR;
}

function createConfilmTemplateRecovery() {
  const confilmTemplateR = [
    {
      type: "template",
      altText: buttonTitleR,
      template: {
        type: "confirm",
        text: "他にも写真を送りますか？",
        actions: [
          {
            type: "message",
            label: "はい",
            text: "復旧写真を送る",
          },
          {
            type: "message",
            label: "いいえ",
            text: "次の操作に進む",
          },
        ],
      },
    },
  ];
  return confilmTemplateR;
}

function createReportButtonRecovery() {
  const defaultAction = {
    type: "message",
    label: "記録する",
    text: "【記録】",
  };
  const reportButtonR = [
    {
      type: "template",
      altText: buttonTitleR + "（3）確認内容を記録する",
      template: {
        type: "buttons",
        thumbnailImageUrl:
          "https://github.com/chell2/nodejs-agusys/blob/main/img/6.png?raw=true",
        imageAspectRatio: "rectangle",
        imageSize: "cover",
        imageBackgroundColor: "#03989e",
        text: "下記をタップ後に送られたメッセージを記録します",
        defaultAction: defaultAction,
        actions: [defaultAction],
      },
    },
  ];
  return reportButtonR;
}
